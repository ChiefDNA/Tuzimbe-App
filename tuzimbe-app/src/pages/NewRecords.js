import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';

const NewRecords= ()=>{
    const [material, setMaterial] = useState('Sand');
    const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DD HH:MM'));
    const [bought, setBought] = useState('');
    const [used, setUsed] = useState('');
    const [cost,  setCost]  = useState('');

    const handleSubmit =async (event) =>{
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/NewRecord/',{
                material,
                dateTime,
                bought,
                used,
                cost,
            });
            console.log(response.data);
        } catch (error){
           // if (error.response && error.response.data){
                console.error(error.response.data);//iff response.data is defined
           // }else{
           //     console.error(error.message);
          //  }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>MaterialMaterial:</label>
                <select value={material} onChange={(event)=>setMaterial(event.target.value)} >
                    <option value="Sand">Sand</option>
                    <option value="Cement">Cement</option>
                    <option value="Bricks">Bricks</option>
                    <option value="Nails">Nails</option>
                    <option value="Water">Water</option>
                    <option value="Stone Aggregates">Stone Aggregates</option>
                </select>
                <br />
                <label>DateTime:</label>
                <DatePicker selected={dateTime} onChange={(date) => setDateTime(date)} dateFormat="YYYY-MM-DD HH:MM" />
                <br />
                if (material==='Cement'){  
                    <>
                        <label>Bought:</label>
                        <input type="number" value={bought} onChange={(event)=>setBought(event.target.value)} /> <> Bags</>
                        <br />
                        <label>Used:</label>
                        <input type="number" value={used} onChange={(event)=>setUsed(event.target.value)} /> <> Bags</>
                        <br />
                    </>
                }else if(material==='Water'){ 
                    <>
                        <label>Bought:</label>
                        <input type="number" value={bought} onChange={(event)=>setBought(event.target.value)} /> <> in Liter</>
                        <br />
                        <label>Used:</label>
                        <input type="number" value={used} onChange={(event)=>setUsed(event.target.value)} /> <> in Liters</>
                        <br />
                    </>
                }else if(material==='Bricks'){ 
                    <>
                        <label>Bought:</label>
                        <input type="number" value={bought} onChange={(event)=>setBought(event.target.value)} />
                        <br />
                        <label>Used:</label>
                        <input type="number" value={used} onChange={(event)=>setUsed(event.target.value)} />
                        <br />
                    </>
                }else { 
                    <>
                        <label>Bought:</label>
                        <input type="number" value={bought} onChange={(event)=>setBought(event.target.value)} /> <> in kilogrames</>
                        <br />
                        <label>Used:</label>
                        <input type="number" value={used} onChange={(event)=>setUsed(event.target.value)} /> <> in kilogrames</>
                        <br />
                    </>
                }
                <label>Cost per Item:</label>
                <input type="number" value={cost} step="0.01" placeholder="Enter Amount" onChange={(event)=>setCost(event.target.value)} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}
export default NewRecords;