import { makeStyles } from '@material-ui/core/styles'
import {
  Box,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  Stepper,
  Step,
  StepButton,
} from '@material-ui/core'
import { Close, ChevronLeft, ChevronRight } from '@material-ui/icons'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    right: theme.spacing(-6),
    top: theme.spacing(0),
  },
  stepper: {
    marginTop: '4%',
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
  },
}))

function IntroTemplate({ open, setOpen }) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { label: '步骤一', photo: '' },
    { label: '步骤二', photo: '' },
    { label: '步骤三', photo: '' },
  ]

  return (
    <Dialog open={open} maxWidth='lg'>
      <Box width={700} position='relative'>
        <DialogActions className={classes.closeBtn}>
          <IconButton
            // size='samll'
            onClick={() => {
              setOpen(false)
            }}
          >
            <Close fontSize='small' />
          </IconButton>
        </DialogActions>
      </Box>
      <DialogContent>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepper}
        >
          {steps.map((item, index) => (
            <Step key={item.label}>
              <StepButton
                active={index <= activeStep}
                completed={false}
                disabled={false}
                onClick={() => {
                  setActiveStep(index)
                }}
              >
                {item.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box
          width={700}
          height={300}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <IconButton
            onClick={() => {
              setActiveStep((step) => step - 1)
            }}
            disabled={activeStep === 0}
          >
            <ChevronLeft />
          </IconButton>
          <img
            src={steps[activeStep].photo}
            alt={steps[activeStep].label}
            style={{ height: '50%', width: '80%' }}
          />
          <IconButton
            onClick={() => {
              setActiveStep((step) => step + 1)
            }}
            disabled={activeStep === steps.length - 1}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default IntroTemplate
