import config from './config'
import { mint } from './mint'

config.mintTasks.forEach(mintTask => {
  mint(mintTask)
})
