import React from "react";
import { Lightbulb, Sparkles, Scale } from "lucide-react";
import Header from "../component/Header";
import Footer from "../component/footer";

const About = () => {
  return (
    <>
      <Header />

      {/* 🔹 Hero Section */}

             <div
        className="relative h-screen flex items-center about-hero justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="max-w-3xl px-6 z-10" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-4">
            About <span className="text-[var(--primary)]">Us</span>
          </h1>
          <p
            className="text-lg md:text-2xl text-[var(--text-light)] mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            We’re passionate creators, learners, and innovators — building a place
            where knowledge meets curiosity. Together, we make learning fun and
            limitless.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            className="btn mt-4"
          >
            Learn More ↓
          </button>
        </div>
      </div>

      {/* 🔹 About Content */}
      <section className="about px-6 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl font-extrabold text-center mb-12"
            data-aos="fade-up"
          >
            Who We Are
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6" data-aos="fade-right">
              <p className="text-lg leading-relaxed">
                Our mission is to make learning fun and accessible to everyone. We
                believe quizzes are a powerful tool for education and personal
                growth. Whether you're a student, a professional, or just curious,
                our platform helps you explore new subjects and test your
                knowledge.
              </p>
              <p className="text-lg leading-relaxed">
                We're a small but passionate team dedicated to creating
                high-quality, engaging content. We're constantly working on new
                features and quizzes to make your experience even better.
              </p>
            </div>

            {/* Right: Image */}
            <div data-aos="fade-left">
              <img
                src="/about1.jpg"
                alt="Team working"
                className="abt-img rounded-3xl w-full shadow-2xl"
              />
            </div>
          </div>

          {/* 🔹 Values Section */}
          <div className="mt-24">
            <h3
              className="text-4xl font-bold text-center mb-12"
              data-aos="fade-up"
            >
              Our Core Values
            </h3>

            <div className="grid md:grid-cols-3 gap-10 text-center">
              {/* Value 1 */}
              <div
                className="abt-card p-8 rounded-2xl transform transition-transform hover:-translate-y-2"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <Lightbulb size={48} className="mx-auto mb-4 text-[var(--primary)]" />
                <h4 className="text-2xl font-semibold mb-2 text-[var(--text-dark)]">
                  Knowledge
                </h4>
                <p>We believe in the power of learning and curiosity to drive growth.</p>
              </div>

              {/* Value 2 */}
              <div
                className="abt-card p-8 rounded-2xl transform transition-transform hover:-translate-y-2"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <Sparkles size={48} className="mx-auto mb-4 text-[var(--primary)]" />
                <h4 className="text-2xl font-semibold mb-2 text-[var(--text-dark)]">
                  Fun
                </h4>
                <p>Learning shouldn’t be a chore — we make it enjoyable and exciting.</p>
              </div>

              {/* Value 3 */}
              <div
                className="abt-card p-8 rounded-2xl transform transition-transform hover:-translate-y-2"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <Scale size={48} className="mx-auto mb-4 text-[var(--primary)]" />
                <h4 className="text-2xl font-semibold mb-2 text-[var(--text-dark)]">
                  Fairness
                </h4>
                <p>We ensure every quiz is fair, balanced, and rewarding for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
