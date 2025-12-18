
      
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-times');
            });
        });
        
        // Skill bars animation
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
        
        const aboutSection = document.getElementById('about');
        
        function checkAboutSection() {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (aboutTop < triggerBottom) {
                animateSkillBars();
                window.removeEventListener('scroll', checkAboutSection);
            }
        }
        
        
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        const messageText = document.getElementById('messageText');
        

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function showError(inputId, errorId) {
            document.getElementById(inputId).classList.add('error');
            document.getElementById(errorId).style.display = 'block';
        }
        
        function hideError(inputId, errorId) {
            document.getElementById(inputId).classList.remove('error');
            document.getElementById(errorId).style.display = 'none';
        }
        
        function validateForm() {
            let isValid = true;
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
  
            if (name === '') {
                showError('name', 'nameError');
                isValid = false;
            } else {
                hideError('name', 'nameError');
                document.getElementById('name').classList.add('success');
            }
            
         
            if (email === '' || !validateEmail(email)) {
                showError('email', 'emailError');
                isValid = false;
            } else {
                hideError('email', 'emailError');
                document.getElementById('email').classList.add('success');
            }
            
            
            if (subject === '') {
                showError('subject', 'subjectError');
                isValid = false;
            } else {
                hideError('subject', 'subjectError');
                document.getElementById('subject').classList.add('success');
            }
            
            
            if (message === '') {
                showError('message', 'messageError');
                isValid = false;
            } else {
                hideError('message', 'messageError');
                document.getElementById('message').classList.add('success');
            }
            
            return isValid;
        }
        
   
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
        
            submitBtn.classList.add('btn-loading');
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Success
                    formMessage.className = 'form-message success';
                    formMessage.querySelector('i').className = 'fas fa-check-circle';
                    messageText.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon!';
                    formMessage.style.display = 'flex';
                    
                   
                    contactForm.reset();
                    
                 
                    document.querySelectorAll('.form-control').forEach(input => {
                        input.classList.remove('success');
                    });
                } else {
                    throw new Error(data.message || 'Something went wrong');
                }
            } catch (error) {
           
                formMessage.className = 'form-message error';
                formMessage.querySelector('i').className = 'fas fa-exclamation-circle';
                messageText.textContent = 'Oops! Something went wrong. Please try again or contact me directly via email.';
                formMessage.style.display = 'flex';
            } finally {
       
                submitBtn.classList.remove('btn-loading');
                submitBtn.disabled = false;
            
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 8000);
            }
        });
        

        document.getElementById('name').addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                hideError('name', 'nameError');
                this.classList.add('success');
            }
        });
        
        document.getElementById('email').addEventListener('blur', function() {
            if (validateEmail(this.value.trim())) {
                hideError('email', 'emailError');
                this.classList.add('success');
            }
        });
        
        document.getElementById('subject').addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                hideError('subject', 'subjectError');
                this.classList.add('success');
            }
        });
        
        document.getElementById('message').addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                hideError('message', 'messageError');
                this.classList.add('success');
            }
        });
        

        window.addEventListener('DOMContentLoaded', () => {
            checkAboutSection();
        });
        
        window.addEventListener('scroll', () => {
            checkAboutSection();
        });
        

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
  
        

document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const texts = ['Web Developer', 'UI/UX Designer', 'SEO Expert', 'Content Creator', 'Freelancer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
});


document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });
    

    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(num => animateCounter(num));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.portfolio-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

