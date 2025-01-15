export default function LoadMoreButton ({loadMore}){
    return(
        <div className="text-center mb-5">
            <button id="load-more" className="btn btn-secondary" onClick={loadMore}>
                Load More
            </button>
        </div>
    )
}