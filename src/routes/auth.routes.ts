import {Router} from 'express'

const router = Router()

import { signIn,signUp } from '../controllers/user.contoller';
import { deleteNote, editContent, newNote, showDetails, showNotes } from "../controllers/notas.controller";

router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/newnote',newNote)
router.post('/shownotes',showNotes)
router.post('/showdetails',showDetails)
router.post('/edit',editContent)
router.post('/delete',deleteNote)
 
export default router;