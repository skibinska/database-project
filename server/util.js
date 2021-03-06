const reviews = require('./database/queries/reviews');

let fetchReviewsAndReply = (req, reply, isFiltered) => {
  return (error, rows) => {
    if(error) return reply(error).statusCode(400);
    if(rows.length === 0) {
      return reply('No resources found');
    }
    reviews.getWithResourceId((error, reviews) => {
      if(error) return reply(error).statusCode(400);
      reply.view('index', {
        resources: rows,
        isFiltered: isFiltered,
        reviews: getTopEight(reviews)
      });
    });
  };
};

let getTopEight = function(reviews) {
  return reviews.slice(-8);
};

module.exports = {
  fetchReviewsAndReply: fetchReviewsAndReply,
  getTopEight: getTopEight
};
