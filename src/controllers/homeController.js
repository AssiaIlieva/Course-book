const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddlware');
const courseService = require('../services/courseService');
const userService = require('../services/userService')

router.get('/', async (req, res) => {
    const latestCourses = await courseService.getLatest().lean();
    res.render('home', {latestCourses})
});

router.get('/profile', isAuth, async(req, res) => {
    const user = await userService.getInfo(req.user._id).lean();
    const createdCoursesCount = user.createdCourses?.length || 0;
    const signUpCoursesCount = user.signedUpCourses?.length || 0

    res.render('profile', {user, createdCoursesCount, signUpCoursesCount});
})



module.exports = router