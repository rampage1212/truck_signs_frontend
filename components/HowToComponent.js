import Link from "next/link";
import Image from "next/image";
import styles from "../styles/HowToComponent.module.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
  Card,
  Alert,
} from "react-bootstrap";
import LogoGrid from "./LogoGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import ReactPlayer from "react-player";
import { Video, CloudinaryContext } from "cloudinary-react";
import { useRef } from "react";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const HowToComponent = () => {
  const videoRef = useRef();

  useEffect(async () => {}, []);

  return (
    <>
      <Row className={styles.row}>
        <Col className={styles.videoCol} xs={12} sm={12} md={6} lg={6}>
          <div className={styles.videoDiv}>
            <CloudinaryContext
              cloud_name="trucksigns17"
              alt="Video of how to apply Truck Sign Vinyl"
            >
              <div>
                <Video
                  publicId="truck-sings-videos/video-sample_hbbiwp"
                  alt="Video of how to apply Truck Sign Vinyl"
                  width="100%"
                  controls
                  innerRef={videoRef}
                />
              </div>
            </CloudinaryContext>
          </div>
        </Col>
        <Col className={styles.infoCol} xs={12} sm={12} md={6} lg={6}>
          <div className={styles.infoDiv}>
            <h1 className={styles.header}>
              How to install vinyl graphics on the truck
            </h1>
            <p className={styles.p}>
              Signs area easy to apply, die-cut from a durable 24 inch, 9 years,
              outdoor adhesive vinyl.
            </p>

            <p className={styles.p}>
              1] Trial-fit your graphics to the vehicle. Take your time, stand
              back and be sure the fit and the aesthetic are perfect. Then mark
              the placement with tape or a grease pencil.
            </p>

            <p className={styles.p}>
              2] Remove the wax and any handprints with mineral spirits or
              alcohol. Wear gloves and work in a well-ventilated area to be
              safe.
            </p>

            <p className={styles.p}>
              3] Thoroughly douse the surface with wetting agent to allow you to
              reposition the film if necessary.
            </p>

            <p className={styles.p}>
              4] Peel the backing film away from the vinyl carefully. Don't
              leave any of the vinyl behind on the backing film.
            </p>

            <p className={styles.p}>
              5] Position the graphic precisely. If you;ve kept the surface wet,
              it'll be simple to reposition the graphic slightly to hit your
              marks.
            </p>

            <p className={styles.p}>
              6] After you've squeegeed thoroughly, you can slowly peel the
              transfer film away from the car.
            </p>

            <p className={styles.p}>
              7] Remove water bubbles by puncturing and squeegeeing the water
              out through the hole.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default HowToComponent;
