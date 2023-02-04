import {Router} from 'express'

const router = Router()

import { signIn,signUp } from '../controllers/user.contoller';
import { newNote, showDetails, showNotes } from "../controllers/notas.controller";

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/newnote',newNote)
router.get('/shownotes',showNotes)
router.post('/showdetails',showDetails)

export default router;