import { Accordion, AccordionDetails, AccordionSummary, Grid, ListItem, ListItemText, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons';

const AssociatedFees = () => {
  return (
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
          <Grid item xs={12} style={{ marginTop: '15px' }}>
            <Typography variant="caption">* P = Price, </Typography>
            <Typography variant="caption">* L = Lots, </Typography>
            <Typography variant="caption">* S = Spent</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default AssociatedFees;
