export const Button=({label, onClick, disabled}:{
    label:string,
    onClick?: ()=>void,
    disabled?: boolean
})=>{
    return <div className="py-6">
        <button onClick={onClick} disabled={disabled} className="cursor-pointer bg-teal-700 rounded-md py-2 px-4 hover:bg-teal-800">
            {label}
        </button>
    </div>
}