<template>
    <div id="app">
        <vue-headful
            title="Cinéma Français d'Autrefois"
            description="Plongée enthousiaste dans le cinéma français d'autrefois"
        />
        <div class="frieze-film-deco">
            <div class="ribbon-hole"></div>
            <div
                class="frieze-img"
                :class="{
                    'fi-1': 1 === fimg,
                    'fi-2': 2 === fimg,
                    'fi-3': 3 === fimg,
                }"
            ></div>
            <div class="ribbon-hole"></div>
        </div>
        <div class="top-tail">
            <p>
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 49.207031 15.09375 L 46.105469 11.992188 C 45.746094 11.632813 45.171875 11.601563 44.773438 11.917969 C 43.878906 12.636719 42.878906 13 41.800781 13 C 39.207031 13 37.101563 10.890625 37.101563 8.300781 C 37.101563 7.222656 37.464844 6.222656 38.179688 5.324219 C 38.5 4.925781 38.46875 4.351563 38.109375 3.992188 L 35.007813 0.894531 C 33.953125 -0.164063 32.046875 -0.160156 30.996094 0.890625 L 25.632813 6.21875 L 27.007813 7.59375 C 27.398438 7.984375 27.398438 8.617188 27.007813 9.007813 C 26.8125 9.203125 26.554688 9.300781 26.300781 9.300781 C 26.042969 9.300781 25.789063 9.203125 25.59375 9.007813 L 24.214844 7.628906 L 0.792969 30.894531 C 0.265625 31.421875 -0.0234375 32.132813 -0.0234375 32.898438 C -0.0234375 33.667969 0.265625 34.378906 0.792969 34.90625 L 3.894531 38.007813 C 4.253906 38.367188 4.824219 38.402344 5.226563 38.082031 C 6.175781 37.320313 7.269531 36.898438 8.300781 36.898438 C 10.890625 36.898438 13 39.007813 13 41.597656 C 13 42.734375 12.59375 43.8125 11.855469 44.628906 C 11.5 45.027344 11.515625 45.628906 11.894531 46.007813 L 14.992188 49.105469 C 15.519531 49.632813 16.234375 49.925781 17 49.925781 C 17.765625 49.925781 18.480469 49.632813 19.007813 49.105469 L 42.351563 25.761719 L 40.992188 24.40625 C 40.601563 24.015625 40.601563 23.382813 40.992188 22.992188 C 41.386719 22.601563 42.015625 22.601563 42.40625 22.992188 L 43.765625 24.347656 L 49.0625 19.050781 C 49.613281 18.609375 49.957031 17.953125 50.007813 17.234375 C 50.0625 16.4375 49.769531 15.65625 49.207031 15.09375 Z M 28.394531 10.394531 C 28.785156 10.003906 29.414063 10.003906 29.808594 10.394531 L 31.210938 11.796875 C 31.601563 12.1875 31.601563 12.820313 31.210938 13.210938 C 31.015625 13.40625 30.761719 13.503906 30.503906 13.503906 C 30.246094 13.503906 29.992188 13.40625 29.796875 13.210938 L 28.394531 11.808594 C 28.003906 11.417969 28.003906 10.785156 28.394531 10.394531 Z M 25.898438 29.5 L 24.601563 35.398438 L 21.601563 30.097656 L 15.601563 30.597656 L 19.699219 26.097656 L 17.300781 20.5 L 22.800781 23 L 27.402344 19 L 26.601563 25.199219 L 31.800781 28.300781 Z M 35.421875 17.421875 C 35.226563 17.617188 34.972656 17.714844 34.714844 17.714844 C 34.460938 17.714844 34.203125 17.617188 34.007813 17.421875 L 32.605469 16.019531 C 32.214844 15.628906 32.214844 14.992188 32.605469 14.605469 C 32.996094 14.214844 33.628906 14.214844 34.019531 14.605469 L 35.421875 16.007813 C 35.8125 16.398438 35.8125 17.03125 35.421875 17.421875 Z M 39.632813 21.632813 C 39.4375 21.828125 39.183594 21.925781 38.925781 21.925781 C 38.671875 21.925781 38.414063 21.828125 38.21875 21.632813 L 36.816406 20.230469 C 36.425781 19.839844 36.425781 19.207031 36.816406 18.816406 C 37.207031 18.425781 37.839844 18.425781 38.230469 18.816406 L 39.632813 20.21875 C 40.023438 20.609375 40.023438 21.242188 39.632813 21.632813 Z"/></svg>
                Plongée enthousiaste dans le cinéma français d'autrefois
            </p>
            <p>
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="26px" height="26px"><path d="M 25 2 C 24.449219 2 24 2.449219 24 3 L 24 3.8125 L 2 10.34375 L 2 10 C 2 9.449219 1.550781 9 1 9 C 0.449219 9 0 9.449219 0 10 L 0 15 C 0 15.550781 0.449219 16 1 16 C 1.550781 16 2 15.550781 2 15 L 2 14.75 L 24 22.15625 L 24 23 C 24 23.550781 24.449219 24 25 24 C 25.550781 24 26 23.550781 26 23 L 26 3 C 26 2.449219 25.550781 2 25 2 Z M 23 6 L 23 9 L 3 12 L 3 11.5 Z M 6.46875 16.84375 C 6.4375 16.851563 6.40625 16.863281 6.375 16.875 C 6.179688 16.933594 6.027344 17.085938 5.96875 17.28125 L 5.71875 17.90625 C 5.253906 19.296875 6.015625 20.816406 7.40625 21.28125 L 9.90625 22.125 C 11.296875 22.589844 12.816406 21.828125 13.28125 20.4375 L 13.5 19.8125 C 13.59375 19.605469 13.5625 19.367188 13.421875 19.1875 C 13.28125 19.011719 13.054688 18.929688 12.832031 18.976563 C 12.609375 19.023438 12.433594 19.1875 12.375 19.40625 L 12.15625 20.03125 C 12.144531 20.042969 12.136719 20.050781 12.125 20.0625 C 11.867188 20.839844 11.058594 21.257813 10.28125 21 L 7.78125 20.15625 C 7.003906 19.898438 6.617188 19.089844 6.875 18.3125 L 7.09375 17.65625 C 7.167969 17.460938 7.136719 17.242188 7.007813 17.074219 C 6.882813 16.910156 6.675781 16.820313 6.46875 16.84375 Z"/></svg>
                Échangeons : <a href="mailto:dupuy.clement@wanadoo.fr">dupuy.clement@wanadoo.fr</a>
            </p>
            </div>
        <Nav />
        <main>
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "HCF",
    components: {
        Nav,
        Footer,
    },
    data() {
        return {
            fimg: 1,
        };
    },
    created() {
        const nbRandom = Math.floor(Math.random() * 3);
        this.fimg = nbRandom != 0 ? nbRandom : 1;

        setInterval(() => {
            if (this.fimg + 1 > 3) {
                this.fimg = 0;
            }
            this.fimg += 1;
        }, 10000);
    },
};
</script>

<style lang="scss">
@import "styles/font.scss";
@import "styles/bp.scss";
@import "styles/color.scss";
@import "styles/shadow.scss";

body {
    margin: 0;
    padding: 0;
    min-width: 330px;
    color: $--color-hcf-black;
    background-color: $--color-hcf-red;
    background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.9) 5%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 70%,
            rgba(0, 0, 0, 0.9) 100%
        ),
        url("assets/img/red-curtain-pattern.svg");
    background-size: 700px;
    min-height: 100vh;

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background-color: rgba(68, 68, 68, 0.05);
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: rgba(68, 68, 68, 0.05);
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: rgba(56, 52, 47, 0.699);
    }

    .VueCarousel-navigation-button {
        color: $--color-hcf-red !important;

        &:focus {
            outline: none !important;
        }

        &.VueCarousel-navigation-next {
            &::after {
                content: "";
                display: block;
                height: 24px;
                width: 24px;
                background: url("./assets/img/icon-next.svg") no-repeat center 0;
                position: absolute;
                top: 3px;
                left: 0px;
            }

            &.VueCarousel-navigation--disabled {
                &::after {
                    content: "";
                    display: block;
                    height: 24px;
                    width: 24px;
                    background: url("./assets/img/icon-next-disabled.svg")
                        no-repeat center 0;
                    position: absolute;
                    top: 3px;
                    left: 0px;
                }
            }
        }

        &.VueCarousel-navigation-prev {
            &::after {
                content: "";
                display: block;
                height: 24px;
                width: 24px;
                background: url("./assets/img/icon-prev.svg") no-repeat center 0;
                position: absolute;
                top: 3px;
                right: 0px;
            }

            &.VueCarousel-navigation--disabled {
                &::after {
                    content: "";
                    display: block;
                    height: 24px;
                    width: 24px;
                    background: url("./assets/img/icon-prev-disabled.svg")
                        no-repeat center 0;
                    position: absolute;
                    top: 3px;
                    right: 0px;
                }
            }
        }
    }

    .ql-editor,
    .docu_content .content {
        padding: 0.3em;
        max-width: 440px;
        font-size: 17px;
        line-height: 1.2;
        font-family: "Source Sans Pro", sans-serif;
        text-align: left;
        min-height: none;

        h1 {
            color: #3a2104;
            line-height: 1.1;
            font-size: 1.7em !important;
            text-align: center;
            border-bottom: 1px solid #3a2104;
            border-top: 1px solid #3a2104;
            padding: 0.4em 0 !important;
        }

        .ql-align-justify {
            text-align: justify;
        }

        .ql-align-left {
            text-align: left;
        }

        .ql-align-center {
            text-align: center;
        }

        .ql-align-right {
            text-align: right;
        }

        .ql-size-small {
            font-size: 0.75em;
        }

        .ql-size-large {
            font-size: 1.15em;
        }

        .ql-size-huge {
            font-size: 1.4em;
        }

        a {
            font-weight: 600 !important;
            color: #946a3b !important;
            text-decoration: underline;
        }
    }

    .quillWrapper {
        margin: 0 !important;

        .ql-container {
            border: 0px solid #ccc;
        }
    }

    .ql-editor blockquote,
    .ql-editor h1,
    .ql-editor h2,
    .ql-editor h3,
    .ql-editor h4,
    .ql-editor h5,
    .ql-editor h6,
    .ql-editor ol,
    .ql-editor p,
    .ql-editor pre,
    .ql-editor ul,
    .docu_content .content blockquote,
    .docu_content .content h1,
    .docu_content .content h2,
    .docu_content .content h3,
    .docu_content .content h4,
    .docu_content .content h5,
    .docu_content .content h6,
    .docu_content .content ol,
    .docu_content .content p,
    .docu_content .content pre,
    .docu_content .content ul {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
            list-9;
    }

    .person-biography,
    .overview.edit {
        .ql-toolbar {
            border-radius: 4px 4px 0 0;
            background-color: white;
        }

        .ql-editor {
            background-color: rgba(156, 156, 156, 0.315);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.205);
            max-width: none;
            border-radius: 0 0 4px 4px;
            line-height: 1.3;
            font-size: 1rem;

            a {
                color: white !important;
            }

            p {
                margin: 0;

                &:first-child {
                    margin-top: 0.4rem;
                }
            }
        }
    }

    .person-info .biography,
    .movie-info .overview {
        p {
            margin: 0;

            &:first-child {
                margin-top: 0.4rem;
            }

            a {
                color: #f6e5c8 !important;
                text-decoration: underline;
                font-weight: 600;
            }
        }
    }

    .my-gallery {
        display: flex;
        flex-wrap: wrap;
        background-color: rgb(15, 15, 15);
        box-shadow: inset 0px 0px 20px 1px rgba(0, 0, 0, 0.7);
        justify-content: center;
        overflow: hidden;
        padding: 1% 1%;

        figure {
            width: 10%;
            margin: 1%;
            position: relative;
            top: 0;
            transition: 0.3s ease;
            display: flex;
            align-items: center;

            &:hover {
                top: -5px;
            }

            a {
                img {
                    width: 100%;
                    object-fit: contain;
                    box-shadow: 0 3px 6px rgba(15, 12, 10, 1),
                        0 3px 6px rgba(15, 12, 10, 1);
                }
            }
        }
    }

    // @media (min-width: $--bp-md) {
    //   .my-gallery {
    //     figure {
    //       width: 20%;
    //     }
    //   }
    // }

    /////////////////////////////////////////

    #app {
        max-width: $--bp-lg;
        margin: 0 auto;
        box-shadow: $--box-shadow-dark-6;
        font-family: "Source Sans Pro", sans-serif;
        text-align: center;
        font-size: 100%;
        line-height: 1;

        .top-tail {
            background-color: #1f0505;
            height: 40px;
            display: flex;
            justify-content: space-between;
            color: #f0debe;
            padding: 0rem 0.75rem;
            align-items: center;
            font-weight: 600;
            font-style: italic;
            font-size: 0.75rem;

            a {
                color: #f0debe;
                text-decoration: underline;
            }

            p:first-child
            {
                svg 
                {
                     width: 0.9rem;
                    height: 0.75rem;
                    position: relative;
                    top: 0rem;
                    fill: #f0debe;
                }
            }
            
            p:last-child
            {
                position: relative;
                left: -0.1rem;

                svg 
                {
                   width: 2.2rem;
                    height: 0.7rem;
                    position: relative;
                    top: 0.2rem;
                    margin-right: -0.5rem;
                    transform: rotate(-29deg);
                    fill: #f0debe;
                }
            }

            @media (max-width: 768px) 
            {
                height: 62px;
                padding: 0rem 1.4rem;

                p:first-child
                {
                    letter-spacing: -0.00955rem;
                    text-align: left;
                    position: relative;
                    top: -0.4rem;
                }

                p:last-child
                {
                    text-align: right;
                    position: relative;
                    top: -0.4rem;
                }
            }
        }

        .frieze-film-deco {
            position: absolute;
            z-index: -1;
            top: 45px;
            left: 0;
            width: 100%;
            box-shadow: $--box-shadow-dark-4;

            .ribbon-hole {
                background: url("assets/img/hole-frieze.svg") repeat-x 0 bottom,
                    #000;
            }

            .frieze-img {
                height: 120px;
                background-repeat: repeat-x;
                transition: background-image 2s;

                &.fi-1 {
                    background-image: url("assets/img/frieze-img-1.jpg");
                }
                &.fi-2 {
                    background-image: url("assets/img/frieze-img-2.jpg");
                }
                &.fi-3 {
                    background-image: url("assets/img/frieze-img-3.jpg");
                }
            }
        }

        .ribbon-hole {
            height: 15px; //20px
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        main {
            box-shadow: inset 0 17px 61px 0 rgba(206, 136, 24, 0.24);
            background-color: $--color-hcf-beige;
        }
    }
}
</style>
