<template>
  <footer>
    <p><span> © L'Histoire du cinéma français</span>  <span class="sepa">|</span>  par <span>Clément Dupuy</span> </p>
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
    color: #e8cea2;
    font-size: 0.9em;
    text-align: center;
    
    span {
      font-style: italic;
    }

    span.sepa {
      margin: 0 3px;
      color: #a51f1e;
    }

  }
</style>
