import React from 'react';
import feesConstants from './fees';
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardHeader, CardContent, CardActions, Grid, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { ArrowRight, ExpandMore, Input } from '@material-ui/icons';

function BuySellCard(props) {

  const { type, setTotal, lots, setLots, setAdd } = props;
  const subheader = "Price and Units " + type;
  const [amount, setAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const fees = feesConstants;

  let setAdditionalCharges = () => {
    
  }

  const handleChange = e => {
    if(e.target.name === 'price'){
      setPrice(e.target.value);
      setAdditionalCharges();
    }else if(e.target.name === 'lots'){
      setLots(e.target.value);
      setAdditionalCharges();
    }
    
  }

  const handleSubmit = () => {
    if(price > 0 && lots >= 1){
      let subtotal = price*lots*100;
      setAmount(subtotal);
      setTotal(subtotal);
      if(price && lots){
        let broker = fees.broker.rate * price * lots;
        let clear = fees.clear.rate * price * lots;
        let stamp = fees.stamp.rate * price * lots * 100;
        if(broker < 12) broker = 12;
        if(clear > 200) clear = 200;
        if(stamp > 200) stamp = 200;
        let tax = fees.tax.rate * broker;
        let add = broker + clear + stamp + tax;
        setAdd(add);
      }
    }
  }

  const handleReset = () => {
    setPrice(0);
    if(type !== 'Sold'){
      setLots(0);
    }
    setAmount(0);
    setTotal(0);
  }

  return (
    <Card variant="outlined" style={{ padding: '10px' }}>
      <CardHeader
        avatar={<Input/>}
        title={type}
        subheader={subheader}
      />
      <CardContent>
        <Grid container spacing={4} style={{ marginBottom: '15px' }}>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="price" 
              label="Price / Share" 
              type="number" 
              value={price === 0 ? '' : price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              name="lots" 
              label="Lots (100 units / Lot)" 
              type="number" 
              value={lots === 0 ? '' : lots}
              disabled={(type === 'Sold' && lots) ? true : false}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="caption">Associated Fees</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary={<Typography variant="caption">Brokerage Fees</Typography>} 
                    secondary="12 or 0.42*P*L"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary={<Typography variant="caption">Clearing Fees</Typography>} 
                    secondary="200 or 0.03*P*L"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary={<Typography variant="caption">Stamp Duty</Typography>} 
                    secondary="200 or 0.001*S"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary={<Typography variant="caption">Service Tax</Typography>} 
                    secondary="0.06 * Broker Fee"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginTop: '15px' }}>
                <Typography variant="caption">* P = Price, </Typography>
                <Typography variant="caption">* L = Lots, </Typography>
                <Typography variant="caption">* S = Spent</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <ListItem>
        <ListItemIcon>
          <ArrowRight fontSize="small"/>
        </ListItemIcon>
        <ListItemText>
          {
            amount > 0 ?
            <>
              {
                type === 'Bought' ? <Typography variant="button" color="secondary">{amount.toFixed(2)}</Typography> 
                : <Typography variant="button" color="primary">RM {amount.toFixed(2)}</Typography>
              }
            </> : <Typography variant="button" style={{ color: '#1d1d1d' }}>AMOUNT</Typography>
          }
        </ListItemText>
      </ListItem>
      
      <CardActions>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSubmit}
        >
          <Typography variant="button">confirm</Typography>
        </Button>
        <Button 
          variant="outlined" 
          color="secondary"
          onClick={handleReset}
        >
          <Typography variant="button">reset</Typography>
        </Button>
        <div style={{ flexGrow: 1 }}/>
      </CardActions>
    </Card>
  )
}

export default BuySellCard
