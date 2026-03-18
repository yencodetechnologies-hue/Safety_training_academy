import "../styles/ReviewsSection.css"

function ReviewsSection(){

const reviews=[
{ name:"Alexander Knudsen", rating:5 },
{ name:"Jackson", rating:5 },
{ name:"Anders Sørensen", rating:4 },
{ name:"Jonathan Harvey", rating:5 }
]

return(

<section className="reviews-section">

<div className="container review-container">

<h2 className="review-title">Reviews</h2>

<div className="reviews-grid">

{reviews.map((r,i)=>(

<div key={i} className="review-card">

<div className="review-avatar">G</div>

<h4>{r.name}</h4>

<h2 className="rating">{r.rating}.0</h2>

<div className="stars">⭐⭐⭐⭐⭐</div>

<button className="review-btn">
review us on G
</button>

</div>

))}

</div>

</div>

</section>

)

}

export default ReviewsSection