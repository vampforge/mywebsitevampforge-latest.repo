-- Insert sample pages
INSERT INTO public.pages (title, slug, content, status, meta_title, meta_description) VALUES
('Home', 'home', '{"blocks": [{"type": "hero", "data": {"title": "Welcome to VampForge", "subtitle": "Ignite Your Brand"}}]}', 'published', 'VampForge - Ignite Your Brand', 'Powering visionaries, creators & future-forward brands with cutting-edge digital experiences.'),
('About', 'about', '{"blocks": [{"type": "text", "data": {"content": "We are VampForge, a cutting-edge digital agency."}}]}', 'published', 'About VampForge', 'Learn more about our mission and team.'),
('Services', 'services', '{"blocks": [{"type": "services", "data": {"services": ["Web Development", "UI/UX Design", "Digital Marketing"]}}]}', 'published', 'Our Services', 'Discover our comprehensive digital services.'),
('Contact', 'contact', '{"blocks": [{"type": "contact", "data": {"title": "Get in Touch"}}]}', 'published', 'Contact Us', 'Ready to start your project? Get in touch with us today.');

-- Insert sample portfolio items
INSERT INTO public.portfolio_items (title, slug, description, technologies, status, featured) VALUES
('E-commerce Platform', 'ecommerce-platform', 'A modern e-commerce solution built with Next.js and Stripe.', '["Next.js", "React", "Stripe", "Tailwind CSS"]', 'published', true),
('SaaS Dashboard', 'saas-dashboard', 'A comprehensive dashboard for SaaS applications.', '["React", "TypeScript", "Chart.js", "Material-UI"]', 'published', true),
('Mobile App Design', 'mobile-app-design', 'UI/UX design for a fitness tracking mobile application.', '["Figma", "Adobe XD", "Prototyping"]', 'published', false);

-- Insert sample contact messages
INSERT INTO public.contact_messages (name, email, subject, message) VALUES
('John Doe', 'john@example.com', 'Project Inquiry', 'I would like to discuss a potential web development project.'),
('Jane Smith', 'jane@example.com', 'Partnership', 'Interested in exploring partnership opportunities.');

-- Insert sample newsletter subscribers
INSERT INTO public.newsletter_subscribers (email, name) VALUES
('subscriber1@example.com', 'Alex Johnson'),
('subscriber2@example.com', 'Sarah Wilson');
