import express from express
import * as pageMethods from '../webData'

const router = express.Router();

router.get('getArticles/:number', pageMethods.getArticles)
router.get('getPage/:pageName', pageMethods.getPage) //get page with global config

router.post('uploadArticle', pageMethods.uploadArticle)
router.post('changeGlobalConfig/:config', pageMethods.changeConfig)//todo
router.post('changePage/:page', pageMethods.changePage)//todo