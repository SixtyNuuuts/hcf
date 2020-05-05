<template>
  <section id="moviedocu">
    <div class="moviedocu_border">
      <div class="moviedocu_container">
        <h1>informations complémentaires sur le film</h1>
        <div class="moviedocu_content">
          <div class="col-left">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem doloremque facilis at, possimus numquam assumenda dolores pariatur officiis voluptates quis fugit eum labore quae natus cupiditate unde, quas suscipit magni fuga placeat necessitatibus perferendis? Quidem error numquam excepturi eos, corporis placeat sint dolorem, eum vitae cumque, ducimus assumenda. Accusantium, in?</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, quisquam incidunt voluptates magni quos voluptatibus velit excepturi enim placeat totam officiis delectus temporibus cupiditate laudantium porro debitis nulla! Quae placeat rem consectetur quos! Corporis, fugiat. Corrupti, at sed. Corrupti laudantium autem ab quo impedit beatae, rerum et inventore laborum. Similique placeat, harum praesentium optio itaque, nam non adipisci enim eius officiis cupiditate suscipit modi vel sed eaque? Laborum tempore similique excepturi earum vitae cupiditate assumenda nostrum, magni, quaerat, exercitationem quisquam! Porro similique natus, voluptatem, corporis delectus neque magnam quae quo, provident facilis dolor ut? Iste at temporibus eligendi tempore quaerat!</p>
            <figure>
              <div class="pict">
                <img src="https://picsum.photos/400" alt="idem legend">
              </div>
              <figcaption>An elephant at sunset</figcaption>
            </figure>
          </div>
          <div class="col-right">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic ea molestias nam ad quia aliquam officia ipsa consequatur aspernatur dolores.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit nemo tempora facilis nulla totam eveniet dolorem impedit? Rem molestiae reiciendis, tempora quis vitae quibusdam, eligendi obcaecati blanditiis a exercitationem perferendis et aliquam consequuntur delectus incidunt amet, possimus cupiditate. Recusandae, vero inventore? Repudiandae libero at temporibus vel nulla ut ipsum culpa magnam quam quia tenetur mollitia molestias iusto iure dolorum harum doloribus, deleniti totam obcaecati. Quae necessitatibus rem nulla beatae dicta voluptatem, illum doloremque saepe consequuntur vel aliquid asperiores incidunt sunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, quisquam incidunt voluptates magni quos voluptatibus velit excepturi enim placeat totam officiis delectus temporibus cupiditate laudantium porro debitis nulla! Quae placeat rem consectetur quos! Corporis, fugiat. Corrupti, at sed. Corrupti laudantium autem ab quo impedit beatae, rerum et inventore laborum. Similique placeat, harum praesentium optio itaque, nam non adipisci enim eius officiis cupiditate suscipit modi vel sed eaque? Laborum tempore similique excepturi earum vitae cupiditate assumenda nostrum, magni, quaerat, exercitationem quisquam! Porro similique natus, voluptatem, corporis delectus neque magnam quae quo, provident facilis dolor ut? Iste at temporibus eligendi tempore quaerat!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "MovieDocuEdit",
}
</script>

<style scoped lang="scss">

#moviedocu {
  box-shadow: 0 14px 38px rgba(0, 0, 0, 0.3), 0 10px 12px rgba(0, 0, 0, 0.22);
  position: relative;
  width: 102%;
  left: -0.9%;

  .moviedocu_border {
    background: url('../../../assets/img/content-tail-left.png') repeat-y 0 0, url('../../../assets/img/content-tail-right.png') repeat-y right 0;
    padding: 0 3px;
    position: relative;
    width: 101%;
    left: -1%;

    .moviedocu_container {
      background: url('../../../assets/img/main-pattern.jpg') repeat scroll left top;
      padding: 2%;
      padding-bottom: 4%;

      h1 {
        font-family: "Bazar";
        color: #2b1d07;
        font-size: 1.5em;
        margin-bottom: .9em;
        text-transform: uppercase;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.12);
      }

      .moviedocu_content {
        display: flex;
        justify-content: center;

        div {
          flex-basis: 47%;
          margin: 0 2.5%;
      
          p {
            text-align: justify;
          }

          figure {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0;
            border: .8em solid white;
            box-sizing: border-box;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: white;
            
            .pict {
              margin: 0;
              max-height: 250px;
              overflow: hidden;

              img {
                width: 100%;
              }
            }

            figcaption {
              padding: 1em;
              padding-bottom: 0.4em;
              color: #6d400b;
            }

          }

        }

      }

    }

  }

}

</style>
