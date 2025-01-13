import express from 'express';
const router = express.Router();

router.get('/hotelId',(req, res, next) => {
    res.status(200).json({
    message: 'getting statistics for a particular hotel...'
    });
});



export default router;