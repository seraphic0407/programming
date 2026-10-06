import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { MusicFeastBackground } from "../../components/musicfeast-background";
import "./about.css";

export const About = () => {
  return (
    <MusicFeastBackground>
      <div className="about-page">
        <Navbar />

        <main className="about-main">
          <section className="about-hero">
            <div className="about-hero-glow" />

            <div className="about-hero-sparkles">
              <span>✦</span>
              <span>·</span>
              <span>✧</span>
              <span>·</span>
            </div>

            <div className="about-hero-index">
              <span>01</span>
              <span>ABOUT MUSICFEAST</span>
            </div>

            <div className="about-hero-content">
              <p className="about-kicker">A SPACE FOR MUSIC & PEOPLE</p>

              <h1>
                Music creates
                <span>moments.</span>
              </h1>

              <p className="about-hero-description">
                MusicFeast brings music, people, and unforgettable experiences
                into one place.
              </p>
            </div>

            <div className="about-hero-art">
              <div className="about-art-ring about-art-ring-one" />
              <div className="about-art-ring about-art-ring-two" />
              <div className="about-art-ring about-art-ring-three" />

              <div className="about-art-center">
                <span>♫</span>
              </div>

              <span className="about-art-note about-art-note-one">♪</span>

              <span className="about-art-note about-art-note-two">♫</span>

              <span className="about-art-note about-art-note-three">♪</span>

              <span className="about-art-star about-art-star-one">✦</span>

              <span className="about-art-star about-art-star-two">✧</span>
            </div>

            <div className="about-hero-bottom">
              <span>EST. 2026</span>
              <span>MUSICFEAST</span>
              <span>WHERE MUSIC CONNECTS</span>
            </div>
          </section>

          <section id="story" className="about-story">
            <div className="about-section-number">
              <span>02</span>
              <span>OUR STORY</span>
            </div>

            <div className="about-story-heading">
              <h2>
                Born from the belief
                <em>that music connects us.</em>
              </h2>
            </div>

            <div className="about-story-content">
              <p className="about-story-lead">
                MusicFeast was created from a simple idea: music is more than
                sound. It is a feeling, a memory, and a reason for people to
                come together.
              </p>

              <p>
                We create a space where people can discover events, experience
                different sounds, and become part of a community that shares the
                same energy.
              </p>

              <p>
                From intimate performances to unforgettable festivals,
                MusicFeast is designed to make every moment feel worth
                remembering.
              </p>

              <div className="about-story-line" />
            </div>

            <div className="about-story-side">
              <span>THE IDEA</span>

              <strong>
                Music
                <br />
                brings us
                <br />
                together.
              </strong>

              <div className="about-story-symbol">✦</div>
            </div>
          </section>

          <section className="about-values">
            <div className="about-values-top">
              <div className="about-section-number">
                <span>03</span>
                <span>WHAT WE VALUE</span>
              </div>
            </div>

            <div className="about-values-heading">
              <h2>
                Built around
                <em>the experience.</em>
              </h2>
            </div>

            <div className="about-values-list">
              <article className="about-value">
                <span className="about-value-number">01</span>

                <div className="about-value-icon">♧</div>

                <div className="about-value-text">
                  <h3>Community</h3>

                  <p>
                    Creating a place where people feel connected through the
                    music they love.
                  </p>
                </div>
              </article>

              <article className="about-value">
                <span className="about-value-number">02</span>

                <div className="about-value-icon">✦</div>

                <div className="about-value-text">
                  <h3>Experience</h3>

                  <p>
                    Turning every event into an atmosphere people can feel and
                    remember.
                  </p>
                </div>
              </article>

              <article className="about-value">
                <span className="about-value-number">03</span>

                <div className="about-value-icon">◇</div>

                <div className="about-value-text">
                  <h3>Creativity</h3>

                  <p>
                    Exploring new ideas and fresh ways to experience music
                    together.
                  </p>
                </div>
              </article>

              <article className="about-value">
                <span className="about-value-number">04</span>

                <div className="about-value-icon">♡</div>

                <div className="about-value-text">
                  <h3>Magic</h3>

                  <p>
                    Creating moments that stay with you long after the music
                    ends.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <section className="about-closing">
            <div className="about-closing-line" />

            <p>THE MUSICFEAST PHILOSOPHY</p>

            <h2>
              Come for the music.
              <span>Stay for the moment.</span>
            </h2>

            <div className="about-closing-meta">
              <span>DISCOVER</span>
              <span>EXPERIENCE</span>
              <span>CONNECT</span>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </MusicFeastBackground>
  );
};
