// TODO:Implement click function 
export default function NoTours({fetchTours}){
    return (
        <div className='title'>
            <h2>no tours left</h2>
            <button className='btn' onClick={fetchTours}>
                refresh
            </button>
        </div>
    )
}