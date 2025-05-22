import '../styles/style.css'

// Injecter HTML dans #container
const container = document.querySelector('#container')
container.innerHTML = `
  <circular-info size="600">
    <info-item text="Douche">
      <img src="assets/svg/1_douche.svg" />
    </info-item>
    <info-item text="Cuisine">
      <img src="assets/svg/2_cuisine.svg" />
    </info-item>
    <info-item text="Lave-vaisselle">
      <img src="assets/svg/3_lave-vaiselle.svg" />
    </info-item>
    <info-item text="Machine à laver">
      <img src="assets/svg/4_machine-a-laver.svg" />
    </info-item>
    <info-item text="Lavabo">
      <img src="assets/svg/5_lavabo-sdb.svg" />
    </info-item>
    <info-item text="Extérieurs">
      <img src="assets/svg/6_exterieurs.svg" />
    </info-item>
    <info-item text="Toilettes">
      <img src="assets/svg/7_toilette.svg" />
    </info-item>
  </circular-info>
`
