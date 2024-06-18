const { isAuth } = require('../middlewares/authMiddlware');
const courseService = require('../services/courseService');
const { getErrorMessage } = require('../utils/errorUtils');

const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
    const courseData = req.body;

    try {
        await courseService.create(req.user._id, courseData);
        res.redirect('/courses')
    } catch (error) {
        const message = getErrorMessage(error);
        res.render("courses/create", {...courseData, error: message });
    }
});

router.get('/', async (req, res) => {
    const courses = await courseService.getAll().lean();
    res.render('courses/catalog', {courses});
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOneWithOwner(req.params.courseId).lean();
    const signUpUsers = course.signUpList.map(user => user.username).join(', ');
    const isOwner = course.owner && course.owner._id == req.user?._id;
    const isSigned = course.signUpList.some(user => user._id == req.user?._id)
    res.render('courses/details', {...course, signUpUsers, isOwner, isSigned}) 
});

router.get('/:courseId/sign-up', async (req, res) => {
    await courseService.signUp(req.params.courseId, req.user._id)
    res.redirect(`/courses/${req.params.courseId}/details`)
});

router.get('/:courseId/delete', async(req, res) => {
    await courseService.delete(req.params.courseId);
    res.redirect('/courses')
});

async function isCourseOwner(req, res, next) {
    const
}


module.exports = router;