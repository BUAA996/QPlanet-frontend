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
    marginTop: '3.5%',
    paddingBottom: theme.spacing(2),
    '& .MuiStepButton-root': {
      paddingBottom: theme.spacing(2),
      marginBottom: theme.spacing(-2),
    },
    '& .MuiStepIcon-text': {
      fill: 'white',
    },
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: theme.palette.primary.main,
    },
  },
}))

function IntroTemplate({ open, setOpen, steps }) {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)

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
          marginBottom='4%'
        >
          <IconButton
            onClick={() => {
              setActiveStep((step) => step - 1)
            }}
            disabled={activeStep === 0}
            style={{ marginRight: '1%' }}
          >
            <ChevronLeft />
          </IconButton>
          <Box
            height='100%'
            width='80%'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <img
              src={steps[activeStep].photo}
              alt={steps[activeStep].label}
              style={{
                objectFit: 'scale-down',
                borderRadius: '10px',
                userSelect: 'none',
              }}
            />
          </Box>

          <IconButton
            onClick={() => {
              setActiveStep((step) => step + 1)
            }}
            disabled={activeStep === steps.length - 1}
            style={{ marginLeft: '1%' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default IntroTemplate
