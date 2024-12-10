
export default function LoadMoreTours({loadMoreTours}) {

   
    //hancgle click event to load more tours
    function handleClick(){
        loadMoreTours();
    }


    return (
        <div className="text-center mb-5">
    <button id="load-more" className="btn btn-secondary">
      Load More
    </button>
  </div>
    )
}