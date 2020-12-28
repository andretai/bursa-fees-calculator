import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardHeader, CardContent, CardActions, Grid, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core';
import { AccountBalance, ArrowRight, BrandingWatermark, ExpandMore, Input, LayersClear, MonetizationOn } from '@material-ui/icons';

function BuySellCard(props) {

  const { type, setTotal, lots, setLots } = props;
  const subheader = "Price and Units " + type;
  const [amount, setAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  

  const handleChange = e => {
    if(e.target.name === 'price'){
      setPrice(e.target.value);
    }else if(e.target.name === 'lots'){
      setLots(e.target.value);
    }
  }

  const handleSubmit = () => {
    if(price > 0 && lots >= 1){
      let subtotal = price*lots*100; 
      setAmount(subtotal);
      setTotal(subtotal);
    }
  }

  const handleReset = () => {
    setPrice(0);
    if(type !== 'Sold'){
      setLots(0);
    }
    setAmount(0)
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
              disabled={type === 'Sold' && lots}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Associated Fees</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemIcon><AccountBalance fontSize="small"/></ListItemIcon>
                  <ListItemText primary={<Typography variant="caption">Brokerage Fees</Typography>} secondary="12.00"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemIcon><LayersClear fontSize="small"/></ListItemIcon>
                  <ListItemText primary={<Typography variant="caption">Clearing Fees</Typography>} secondary="12.00"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemIcon><BrandingWatermark fontSize="small"/></ListItemIcon>
                  <ListItemText primary={<Typography variant="caption">Stamp Duty</Typography>} secondary="12.00"/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemIcon><MonetizationOn fontSize="small"/></ListItemIcon>
                  <ListItemText primary={<Typography variant="caption">Service Tax</Typography>} secondary="12.00"/>
                </ListItem>
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
                type === 'Bought' ? <Typography variant="subtitle1" color="secondary">{amount.toFixed(2)}</Typography> 
                : <Typography variant="subtitle1" color="primary">RM {amount.toFixed(2)}</Typography>
              }
            </> : <Typography variant="subtitle1" style={{ color: '#1d1d1d' }}>AMOUNT</Typography>
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
