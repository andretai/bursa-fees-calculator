import React from 'react';
import './App.css';
import { Button, Grid, ListItem, ListItemIcon, ListItemText, Paper, Step, Stepper, StepLabel, StepContent } from '@material-ui/core';
import { MenuBook } from '@material-ui/icons';
import BuySellCard from './BuySellCard';
import Output from './Output';

function App() {

  const [buy, setBuy] = React.useState(0);
  const [buyCharges, setBuyCharges] = React.useState(0);
  const [sell, setSell] = React.useState(0);
  const [sellCharges, setSellCharges] = React.useState(0);
  const [lots, setLots] = React.useState(0);

  const buySellObjects = [
    {
      value: buy,
      charges: buyCharges,
      type: 'Bought',
      setGross: setBuy,
      setCharges: setBuyCharges
    },
    {
      value: sell,
      charges: sellCharges,
      type: 'Sold',
      setGross: setSell,
      setCharges: setSellCharges
    }
  ];

  // Stepper MUI
  function getSteps() {
    return ['Enter buying information', 'Enter selling information'];
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
    setBuy(0);
    setSell(0);
    setLots(0);
  };

  return (
    <Grid container>
      <Grid item xs={false} sm={2} md={3}/>
      <Grid item container xs={12} sm={8} md={6} justify="center">
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {
                    index < 2 ? <BuySellCard 
                                  type={buySellObjects[index].type} 
                                  lots={lots} setLots={setLots}
                                  value={buySellObjects[index].value}
                                  setGross={buySellObjects[index].setGross} 
                                  setCharges={buySellObjects[index].setCharges}
                                />
                    : null
                  }
                  <div style={{ marginTop: '15px' }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      disabled={(index < 2) && buySellObjects[index].value <= 0}
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
                <ListItem>
                  <ListItemIcon>
                    <MenuBook color="primary"/>
                  </ListItemIcon>
                  <ListItemText primary="Summary" secondary="Transactions"/>
                </ListItem>
                <Output
                  buyGross={buySellObjects[0].value} sellGross={buySellObjects[1].value}
                  buyCharges={buySellObjects[0].charges} sellCharges={buySellObjects[1].charges}
                  lots={lots}
                />
                <div style={{ marginTop: '15px' }}>
                  {/* <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Save
                  </Button> */}
                  <Button variant="outlined" color="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Paper>
            )}
          </Stepper>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2} md={3}/>
    </Grid>
  );
}

export default App;
