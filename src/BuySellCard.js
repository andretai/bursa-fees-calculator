import React from 'react';
import feesConstants from './Fees';
import { Button, Card, CardHeader, CardContent, CardActions, Grid, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { ArrowRight, Input } from '@material-ui/icons';
import AssociatedFees from './AssociatedFees';

function BuySellCard(props) {

  const { type, value, setGross, lots, setLots, setCharges } = props;
  const subheader = "Price and Units " + type;
  const [price, setPrice] = React.useState(0);
  const fees = feesConstants;

  const handleChange = e => {
    if(e.target.name === 'price'){
      setPrice(e.target.value);
    }else if(e.target.name === 'lots'){
      setLots(e.target.value);
    }
  }

  const handleSubmit = () => {
    if(price > 0 && lots >= 1){
      var total = price*lots*100;
      setGross(total);
      if(price && lots){
        var broker = fees.broker.rate * price * lots;
        var clear = fees.clear.rate * price * lots;
        var stamp = fees.stamp.rate * price * lots * 100;
        if(broker < 12) broker = 12;
        if(clear > 200) clear = 200;
        if(stamp > 200) stamp = 200;
        var tax = fees.tax.rate * broker;
        var charges = broker + clear + stamp + tax;
        setCharges(charges);
      }
    }
  }

  const handleReset = () => {
    setPrice(0);
    if(type !== 'Sold'){
      setLots(0);
    }
    setGross(0);
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
              label="Lots (x100 units)" 
              type="number" 
              value={lots === 0 ? '' : lots}
              disabled={(type === 'Sold' && lots) ? true : false}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <AssociatedFees/>
      </CardContent>
      <ListItem>
        <ListItemIcon>
          <ArrowRight fontSize="small"/>
        </ListItemIcon>
        <ListItemText>
          {
            value > 0 ?
            <>
              {
                type === 'Bought' ? <Typography variant="button" color="secondary">{value.toFixed(2)}</Typography> 
                : <Typography variant="button" color="primary">RM {value.toFixed(2)}</Typography>
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
