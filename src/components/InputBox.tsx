export const InputBox=({heading, placeholder, type, onChange}:{
    heading: string,
    placeholder: string,
    type: string,
    onChange: (e:any)=>void
})=>{
    return <div className="flex flex-col px-5 py-3">
        <div className="text-xs pb-1 flex">
            <div className="text-red-600 pr-1">*</div>
            <label >{heading}</label>

        </div>
        <input type={type} onChange={onChange} placeholder={placeholder} className="outline-none p-2 text-xs bg-zinc-800 rounded-md border border-zinc-600 "/>
    </div>
}