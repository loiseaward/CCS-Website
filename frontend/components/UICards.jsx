import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box'
import "../styles/index.css"

import { Card as CCard, CardContent as CardStuff } from "./ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

export function CarouselSize({ imgArray = [] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {imgArray.map((image, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 rounded-none">
            <div className="p-1">
              <div className="group overflow-hidden border-2 border-[#D4AF37] bg-transparent transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <CCard className="overflow-hidden rounded-none border-none shadow-none p-0 ">
                <CardStuff className="flex h-60 items-center justify-center p-0 overflow-hidden">
                  <img src={image} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"/>
                </CardStuff>
              </CCard>
            </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}



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
          <Typography sx={{fontFamily: 'Noto Serif, serif',fontWeight:'500',color: '#7c3225',}} component="span">Do I have to be Chinese to join CCS?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{fontFamily: 'Noto Serif, serif', color: '#64291f',}}>
          Of course not!
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordianStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography sx={{fontFamily: 'Noto Serif, serif', fontWeight:'500', color: '#7c3225',}} component="span">How can I learn more about CCS?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{fontFamily: 'Noto Serif, serif', color: '#64291f',}}>
          Keep exploring this website!
        </AccordionDetails>
      </Accordion>

      <Accordion sx={accordianStyles}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
        >
          <Typography sx={{fontFamily: 'Noto Serif, serif', fontWeight:'500',color: '#7c3225',}} component="span">What's the best club in Notre Dame?</Typography>
        </AccordionSummary>
          <AccordionDetails sx={{fontFamily: 'Noto Serif, serif', color: '#64291f',}}>
          I know it, you know it, everybody knows it.
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
