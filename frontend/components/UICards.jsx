import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import "../styles/index.css"

export function FAQAccordian() {
  const id = React.useId();

  const accordianStyles = {width: { xs: '100%', sm: '100%', md: 600, lg: 900 }, backgroundColor: '#faf6f3', border: '1.5px solid', borderColor: '#e4c08d',}

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: 4, }}>
      <Accordion sx={accordianStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordianStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordianStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography component="span">Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function MainCard(props) {
  return (
    <Card sx={{width:{xs:'100%', sm:250, md:400},
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    '&:hover': {
      boxShadow: '0 16px 32px rgba(0, 0, 0, 0.25)',
      transform: 'translateY(-2px)',
    },
  }}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          sx={{ height: { xs: 100, sm: 140, md: 200 }, objectFit: 'cover' }}
          image={props.imagesrc}
          alt="CCS Event"
        />
        <CardContent sx={{backgroundColor: '#f2e8d5'}}>
          <Typography gutterBottom variant="h5" component="div" sx={{
              fontFamily: 'Noto Serif, serif',
              color: '#7c3225',
              padding: '5px',
              fontSize: '1.4rem',
            }}>
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{
              fontFamily: 'Noto Serif, serif',
              color: '#361914',
              padding: '8px',
              fontSize: '0.8rem',
            }}>
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
