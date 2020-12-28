import React from 'react';
import './App.css';
import { Button, Grid, ListItem, ListItemIcon, ListItemText, Paper, Step, Stepper, StepLabel, StepContent, Typography } from '@material-ui/core';
import { Business, MenuBook } from '@material-ui/icons';
import BuySellCard from './BuySellCard';
import Header from './Header';

function App() {

  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [lots, setLots] = React.useState(0);

  const stepsContent = [
    {
      val: x,
      type: 'Bought',
      setTotal: setX
    },
    {
      val: y,
      type: 'Sold',
      setTotal: setY
    }
  ];

  function getSteps() {
    return ['Enter buying information', 'Enter selling information', 'Confirm information'];
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return ``;
      case 1:
        return '';
      case 2:
        return ``;
      default:
        return 'Unknown step';
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setX(0);
    setY(0);
    setLots(0);
  };

  return (
    <Grid container>
      <Grid item xs={false} sm={2}/>
      <Grid item container xs={12} sm={8} justify="center">
        <Grid item xs={12}>
          <Header />
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  {
                    index < 2 ? <BuySellCard type={stepsContent[index].type} lots={lots} setLots={setLots} setTotal={stepsContent[index].setTotal}/>
                    : null
                  }
                  {
                    index > 1 ?
                    <Paper variant="outlined" style={{ textAlign: 'justify', marginTop: '15px', padding: '15px' }}>
                      <ListItem>
                        <ListItemIcon>
                          <MenuBook />
                        </ListItemIcon>
                        <ListItemText primary="Summary" secondary="Transactions"/>
                      </ListItem>
                      <Typography>Bought {lots} lots at RM {stepsContent[0].val.toFixed(2)}</Typography>
                      <Typography>Sold {lots} lots at RM {stepsContent[1].val.toFixed(2)}</Typography>
                    </Paper> : null
                  }
                  <div style={{ marginTop: '15px' }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      disabled={(index < 2) && stepsContent[index].val <= 0}
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? 'Calculate' : 'Next'}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            ))}
            {activeStep === steps.length && (
              <Paper variant="outlined" color="primary" square elevation={0} style={{ display: 'block', padding: '15px', marginTop: '15px' }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button variant="outlined" color="secondary" onClick={handleReset}>
                  Reset
                </Button>
              </Paper>
            )}
          </Stepper>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2}/>
    </Grid>
  );
}

export default App;
