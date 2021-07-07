import React, { useState } from 'react'

const ChooseCharacteristics =(props) =>{ 
    const {setCharacteriticsInput,characteriticsInput} = props
    
    const [type, setDescription] = useState({description: '', title:'', index: 0})
    const allCharacteristics = [['Size', ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide']], 
                                ['Width', ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']],
                                ['Comfort', ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect']],
                                ['Quality', ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']],
                                ['Length', ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']],
                                ['Fit', ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']] ]
                                

    return (
        <div >
        <div className="grid grid-cols-6">
		<span className="flex text-xs col-start-3 col-end-6 ">{type.description}</span>
        </div>
        {allCharacteristics.map((element, index) => {
            return ( <>
            <div className="grid grid-cols-3">
              <h6> {element[0]}</h6>
        <div className="flex gap-2  col-start-2 col-end-3 " key ={index}> 
         <label for="choice-1">
			<input type="radio"name={element[0]} value={1}
            onChange = {(e) => {setCharacteriticsInput({...characteriticsInput, [e.target.name]: e.target.value})}}  
            onClick={() => { if (type.index !== type.index+1 && type.title!==element[0]){setDescription({description: element[1][0], index:type.index+1})}}}/>
			<div className="text-xs"> 1 
			</div>
            </label>
            <label for="choice-2">
			<input type="radio"name={element[0]} value={2} 
            onChange = {(e) => {setCharacteriticsInput({...characteriticsInput, [e.target.name]: e.target.value})}}  
            onClick={() => { if (type.index !== type.index +1){setDescription({description: element[1][1], index:type.index+1})}}}/>
			<div className="text-xs">  2				
			</div>
            </label>
            <label for="choice-3">
			<input type="radio"name={element[0]} value={3}
            onChange = {(e) => {setCharacteriticsInput({...characteriticsInput, [e.target.name]: e.target.value})}}  
            onClick={() => { if (type.index !== type.index +1){setDescription({description: element[1][2], index:type.index+1})}}}/>
			<div className="text-xs">
				3
			</div>
            </label>
            <label for="choice-4">
			<input type="radio"name={element[0]} value={4} 
            onChange = {(e) => {setCharacteriticsInput({...characteriticsInput, [e.target.name]: e.target.value})}}  
            onClick={() => { if (type.index !== type.index +1){setDescription({description: element[1][3], index:type.index+1})}}} />
			<div className="text-xs">
				4
			</div>
            </label>
            <label for="choice-5">
			<input type="radio"name={element[0]} value={5} 
            onChange = {(e) => {setCharacteriticsInput({...characteriticsInput, [e.target.name]: e.target.value})}}  
            onClick={() => { if (type.index !== type.index +1){setDescription({description: element[1][4], index:type.index+1})}}}/>
			<div className="text-xs">
				5
			</div>
            </label>
        </div> 
         </div></>) })  }
        <section className="text-xs pt-4 ">
            <p>Descriotion :</p>
            <div><span>{'Quality : (1)Poor  (5)Perfect'}</span></div>
            <div><span>{'Fit : (1)Runs tight  (5)Runs long'}</span></div>
            <div><span>{'Width : (1)Too narrow  (5)Too wide'}</span></div>
            <div><span>{'Length : (1)Runs Short  (5)Runs long'}</span></div>
            <div><span>{'Confort : (1)Uncomfortable  (5)Perfect'}</span></div>
            <div><span>{'Size : (1)A size too small  (5)A size too wide'}</span></div>
        </section>
        
        </div>
    )
}

export default  ChooseCharacteristics;