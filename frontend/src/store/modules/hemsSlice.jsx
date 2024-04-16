import {createSlice} from '@reduxjs/toolkit'

let no=2
const initialState = {
    data:[{id:1,name:'김태리',title:'문의글1',content:'문의내용',date:'2023-7-10'}],
    user:{}
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
            
        }
    }

})

export const {add,remove,edit} = hemsSlice.actions
export default hemsSlice.reducer