import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AccountBalance, AttachMoney, Functions, MonetizationOn, MoneyOff } from '@material-ui/icons';

const Output = (props) => {
  const { buyGross, buyCharges, sellGross, sellCharges, lots } = props;
  const profitLoss = (sellGross-sellCharges) - (buyGross+buyCharges);
  const profitLossRate = profitLoss / (buyGross+buyCharges) * 100;
  return (
    <List>
      <ListItem>
        <ListItemIcon><Functions/></ListItemIcon>
        <ListItemText
          primary="Lots (x100 units)"
          secondary={lots}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><MoneyOff/></ListItemIcon>
        <ListItemText
          primary="Value (Bought)"
          secondary={buyGross}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><AccountBalance/></ListItemIcon>
        <ListItemText
          primary="Paid"
          secondary={(buyGross+buyCharges).toFixed(2)}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><AttachMoney/></ListItemIcon>
        <ListItemText
          primary="Value (Sold)"
          secondary={sellGross}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon><AccountBalance/></ListItemIcon>
        <ListItemText
          primary="Received"
          secondary={(sellGross-sellCharges).toFixed(2)}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="P/L (%)"
          secondary={`${profitLoss.toFixed(2)} (${profitLossRate.toFixed(2)}%)`}
        />
        <ListItemIcon><MonetizationOn color={profitLoss > 0 ? 'primary' : 'secondary' }/></ListItemIcon>
      </ListItem>
    </List>
  )
}

export default Output
