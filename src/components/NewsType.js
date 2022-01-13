import React from 'react'

const NewsType= (props) => {
    
        let { title, desc,imageUrl,nUrl,author,date,source } = props
        return (
            <div className="my-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h4 className="card-title"> {title}  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                        {source} </span>
                    

                    </h4>
                        <p className="card-text">{desc}...</p>
                        <p className="card-text"><small className="text-muted">Last updated on {new Date(date).toDateString()} by {!author?"Anonymous":author}</small></p>
                        <a href={nUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsType
