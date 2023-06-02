<template>
  <footer>
    <p>
        <span class="sepa">©</span> L'Histoire du cinéma français
        <span class="sepa">-</span> Créé et documenté par Clément Dupuy 
        <span class="sepa">-</span> 
        <svg fill="#fcedd5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="26px" height="26px"><path d="M 25 2 C 24.449219 2 24 2.449219 24 3 L 24 3.8125 L 2 10.34375 L 2 10 C 2 9.449219 1.550781 9 1 9 C 0.449219 9 0 9.449219 0 10 L 0 15 C 0 15.550781 0.449219 16 1 16 C 1.550781 16 2 15.550781 2 15 L 2 14.75 L 24 22.15625 L 24 23 C 24 23.550781 24.449219 24 25 24 C 25.550781 24 26 23.550781 26 23 L 26 3 C 26 2.449219 25.550781 2 25 2 Z M 23 6 L 23 9 L 3 12 L 3 11.5 Z M 6.46875 16.84375 C 6.4375 16.851563 6.40625 16.863281 6.375 16.875 C 6.179688 16.933594 6.027344 17.085938 5.96875 17.28125 L 5.71875 17.90625 C 5.253906 19.296875 6.015625 20.816406 7.40625 21.28125 L 9.90625 22.125 C 11.296875 22.589844 12.816406 21.828125 13.28125 20.4375 L 13.5 19.8125 C 13.59375 19.605469 13.5625 19.367188 13.421875 19.1875 C 13.28125 19.011719 13.054688 18.929688 12.832031 18.976563 C 12.609375 19.023438 12.433594 19.1875 12.375 19.40625 L 12.15625 20.03125 C 12.144531 20.042969 12.136719 20.050781 12.125 20.0625 C 11.867188 20.839844 11.058594 21.257813 10.28125 21 L 7.78125 20.15625 C 7.003906 19.898438 6.617188 19.089844 6.875 18.3125 L 7.09375 17.65625 C 7.167969 17.460938 7.136719 17.242188 7.007813 17.074219 C 6.882813 16.910156 6.675781 16.820313 6.46875 16.84375 Z"/></svg>
        Échangeons : <a href="mailto:dupuy.clement@wanadoo.fr">dupuy.clement@wanadoo.fr</a> 
    </p>
  </footer>
</template>

<script>

export default {
  name: "Footer",
};
</script>

<style scoped lang="scss">
  @import '../styles/color.scss';  

  footer {
    padding: 3% 2%;
    background-color: $--color-hcf-black;
    color: $--color-hcf-light-beige;
    font-size: 0.9em;
    text-align: center;
    line-height: 1.3;

    span {
      font-style: italic;
    }

    span.sepa {
      margin: 0 3px;
      // color: #a51f1e;
      color: $--color-hcf-beige;
    }

    a {
      color: $--color-hcf-beige;
      text-decoration: underline;
    }

    svg
    {
      width: 0.9rem;
      position: relative;
      top: 0.6rem;
      margin-right: 0.3rem;
      margin-left: 0.2rem;
      transform: rotate(-23deg);
    }

  }
</style>
