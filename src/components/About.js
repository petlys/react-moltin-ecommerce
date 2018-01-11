import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Hr } from './common'
import { spacing } from '../styles'
import { AboutIcon, ShippingIcon, PaymentIcon, FailedIcon } from './icons'

const Header = styled.h1`
  display: flex;
  align-items: center;
  :first-child {
    margin-top: 0;
  }
`

const iconStyles = {
  marginRight: spacing.md
}

const linkStyles = {
  textDecoration: 'underline'
}

export const About = () => (
  <div className="animated fadeIn medium">
    <Helmet>
      <title>Adaptere.no - Informasjon</title>
      <meta name="description" content="Om oss, Angrer du på kjøpet?, Betaling, Frakt" />
      <link rel="canonical" href="https://adaptere.no/about" />
      <meta property="og:title" content="Adaptere.no - Informasjon" />
      <meta property="og:description" content="Om oss, Angrer du på kjøpet?, Betaling, Frakt" />
      <meta property="og:image" content="https://adaptere.no/thumbnail.png" />
      <meta property="og:url" content="https://adaptere.no/about" />
    </Helmet>
    <Header>
      <AboutIcon style={iconStyles} /> Om oss
    </Header>
    <p>
      Adaptere.no er en liten nettbutikk som har som mål å kunne tilby en enkel, kjapp og samlet arena for kjøp av
      kabler og adaptere i alle varianter, og til rimelige priser. Med et stort utvalg av kabler og adaptere innenfor de
      fleste kategorier, så forsøker vi på å dekke det beste av varebehov. Skulle det imidlertid være et produkt du
      skulle savne i vårt sortement, så gi oss gjerne en tilbakemelding{' '}
      <a href="mailto:kundeservice@adaptere.no" style={linkStyles}>
        her
      </a>.
    </p>
    <p>
      Vi ønsker å levere en kjøpsopplevelse som er enkel og grei for deg som kunde, og opererer derfor uten
      kunderegistrering. Det betyr rett og slett at du slipper å måtte registrere deg hos oss for å handle. Skriv inn
      inn navn og leveringsadresse, betal, og du er i mål. Kjapt og smertefritt!
    </p>
    <Hr />
    <Header>
      <FailedIcon style={iconStyles} />Angrer du på kjøpet?
    </Header>
    <p>
      Ikke noe problem! Angrerettloven gir deg rett til å angre ditt kjøp. Gi oss beskjed senest innen 14 dager etter at
      du mottar leveransen, og send den i retur til følgende adresse:
    </p>
    <i>
      Adaptere.no v/Petter Lysne<br />Hoffsveien 12 A<br />0275 Oslo
    </i>
    <p>
      Produktets tilstand må være tilsvarende som når du mottok det - det vil si uten kosmetiske skader eller lignende.
    </p>
    <Hr />
    <Header>
      <PaymentIcon style={iconStyles} />Betaling
    </Header>
    <p>
      Du kan betale med både Visa, Mastercard eller PayPal. Betaling utføres gjennom Braintree Payments, som er et
      underselskap av PayPal, og har fokus på å levere en trygg og enkel arena for nettbetalinger rettet mot
      nettbutikker.
    </p>
    <Hr />
    <Header>
      <ShippingIcon style={iconStyles} />Frakt
    </Header>
    <p>
      Fast fraktpris på 29 kr. Vi tilbyr fri frakt på ordre over 150 kr. Ordre sendes i boblekonvolutter med A-post, og
      vi kan sådan stille med kort leveringstid på typisk 1-3 dager. Skulle du mot formodning oppleve å ikke motta
      pakken din, eller noen andre problemer med leveransen, ikke nøl med å ta kontakt med oss{' '}
      <a href="mailto:kundeservice@adaptere.no" style={linkStyles}>
        her
      </a>.
    </p>
  </div>
)

export default About
