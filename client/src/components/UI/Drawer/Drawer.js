import React from 'react';
import { Drawer as MUIDrawer, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';


const Drawer = () => {
   
	return(
		<MUIDrawer variant="persistent" anchor="left"
			open={true}>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						{/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</MUIDrawer>
	);
};

export default Drawer;
