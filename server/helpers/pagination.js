exports.currentItems = function(total, start, limit) {
    
    if(limit === 0) return total
    
    return (((total - start) - limit ) <= 0) ? (total - start) + 1 : (limit === 0) ? total : limit;
}

exports.numberOfPages = function (total, limit) {
    return Math.ceil(total / limit)
}

exports.currentPage = function(total, start, limit) {
    let totalPages = Math.ceil(total / limit);
    let pages = (total - start) / limit;
    return Math.ceil(totalPages - pages);  
}

exports.getFirstQueryString = function (start, limit) {
    return `?start=${start}&limit=${limit}`
}

exports.getLastQueryString = function (total, limit) {
    return `?start=${total}&limit=${limit}`
}

exports.getPreviousQueryString = function (total, start, limit) {
    return `?start=${(start - limit > 0) ? (start - limit) : start}&limit=${limit}`
}

exports.getNextQueryString = function(total, start, limit) {
    return `?start=${( (start + limit) < total) ? (start + limit) : start}&limit=${limit}`
}