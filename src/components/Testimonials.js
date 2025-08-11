import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TestimonialSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef();
  const dragStartX = useRef(null);
  const dragDistance = useRef(0);
  const isDragging = useRef(false);

  const testimonials = [
    {
      id: 1,
      name: "John Smith",
      title: "CEO at TechCorp",
      content:
        "This service has been a game-changer for our business. The team's expertise and dedication have helped us achieve remarkable results. We couldn't be happier with the partnership.",
      avatar: "JS",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Marketing Director",
      content:
        "Outstanding quality and professional service. The attention to detail and customer-first approach makes them stand out from the competition. Highly recommended!",
      avatar: "SJ",
      rating: 5,
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      title: "Product Manager",
      content:
        "Exceptional experience from start to finish. The team understood our needs perfectly and delivered beyond our expectations. Great communication throughout.",
      avatar: "MR",
      rating: 5,
    },
    {
      id: 4,
      name: "Emily Chen",
      title: "Operations Lead",
      content:
        "Professional, reliable, and results-driven. Their innovative solutions helped streamline our processes and improve efficiency significantly. Worth every penny!",
      avatar: "EC",
      rating: 5,
    },
  ];

  const animateFlip = (newIndex) => {
    if (newIndex === currentSlide) return;

    const card = slideRef.current;
    if (!card) return;

    card.style.pointerEvents = "none";

    const lastIndex = testimonials.length - 1;
    let forward;

    if (currentSlide === 0 && newIndex === lastIndex) {
      forward = false; 
    } else if (currentSlide === lastIndex && newIndex === 0) {
      forward = true; 
    } else {
      forward = newIndex > currentSlide;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);

        if (forward) {
          gsap.fromTo(
            card,
            { rotationY: -90, scale: 0.8, opacity: 0 },
            {
              rotationY: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              onComplete: () => {
                card.style.pointerEvents = "auto";
              },
            }
          );
        } else {
          gsap.fromTo(
            card,
            { rotationY: 90, scale: 0.8, opacity: 0 },
            {
              rotationY: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              onComplete: () => {
                card.style.pointerEvents = "auto";
              },
            }
          );
        }
      },
    });

    if (forward) {
      tl.to(card, {
        rotationY: 90,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      });
    } else {
      tl.to(card, {
        rotationY: -90,
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      });
    }
  };

  const handleDragStart = (e) => {
    isDragging.current = true;
    dragDistance.current = 0;
    dragStartX.current =
      e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    dragDistance.current = currentX - dragStartX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const threshold = 50; 

    if (dragDistance.current > threshold) {
      animateFlip((currentSlide - 1 + testimonials.length) % testimonials.length);
    } else if (dragDistance.current < -threshold) {
      animateFlip((currentSlide + 1) % testimonials.length);
    }
  };

  const goToSlide = (index) => {
    animateFlip(index);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <div
      style={styles.container}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onTouchCancel={handleDragEnd}
    >
      <div
        style={{ ...styles.card, transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        ref={slideRef}
      >
        <div style={styles.header}>
          <div style={styles.avatar}>{currentTestimonial.avatar}</div>
          <div style={styles.userInfo}>
            <h3 style={styles.name}>{currentTestimonial.name}</h3>
            <p style={styles.title}>{currentTestimonial.title}</p>
          </div>
        </div>

        <div style={styles.rating}>
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <span key={i} style={styles.star}>
              ★
            </span>
          ))}
        </div>

        <div style={styles.content}>
          <p style={styles.text}>"{currentTestimonial.content}"</p>
        </div>

        <div style={styles.dotsContainer}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentSlide ? styles.activeDot : {}),
              }}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    perspective: 1000, 
    userSelect: "none", 
    touchAction: "pan-y", 
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "450px",
    maxHeight: "300px",
    width: "100%",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    position: "relative",
    transformOrigin: "center center",
    cursor: "grab",
    marginTop: "70px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#FFD700",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginRight: "16px",
    userSelect: "none",
  },
  userInfo: {
    flex: 1,
  },
  name: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  title: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#666",
  },
  rating: {
    marginBottom: "20px",
  },
  star: {
    color: "#FFD700",
    fontSize: "18px",
    marginRight: "2px",
  },
  content: {
    marginBottom: "24px",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#444",
    margin: "0",
    fontStyle: "italic",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#ccc",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: "0",
  },
  activeDot: {
    backgroundColor: "#FFD700",
    transform: "scale(1.2)",
  },
};

export default TestimonialSlideshow;
