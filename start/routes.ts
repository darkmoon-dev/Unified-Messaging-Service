

import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'

const SendTextMailController = () => import('#mail/controllers/send_text_mail_controller')

router.get('/', async () => 'It works!')

router.get('/swagger', () => AutoSwagger.default.json(router.toJSON(), swagger))
router.get('/docs', () => AutoSwagger.default.scalar('/swagger'))

router.group(() => {
    router.post('/send-text', [ SendTextMailController ])
}).prefix('mails')
