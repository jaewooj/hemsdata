import {createSlice} from '@reduxjs/toolkit'

let no=2
const initialState = {
    data:[{id:1,name:'김태리',title:'문의글1',content:'문의내용',date:'2023-7-10'}],
    user:{},
    menuNum:1,
}

const hemsSlice = createSlice({
    name:'hems',
    initialState,
    reducers: {
        add(state,action){
            state.data.push({id:no++,...action.payload})
        },
        remove(state,action){

        },
        edit(state,action){
            
        },
        changeMenuNum(state,action){
            state.menuNum=action.payload;
        }
    }

})

export const {add,remove,edit,changeMenuNum} = hemsSlice.actions
export default hemsSlice.reducer