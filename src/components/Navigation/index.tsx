import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from "react";
import { ColorModeContext } from "../../pages/_layout";

export default function Navigation() {
	const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
	return (
		<AppBar
			position="static"
			color="default"
			elevation={0}
			sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
		>
			<Toolbar sx={{ flexWrap: 'wrap' }}>
				<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					HR Form
				</Typography>
				<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
					{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}