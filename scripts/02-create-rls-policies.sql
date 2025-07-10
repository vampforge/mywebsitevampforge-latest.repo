-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Pages table policies
CREATE POLICY "Anyone can view published pages" ON public.pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can view all pages" ON public.pages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authors can create pages" ON public.pages
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own pages" ON public.pages
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all pages" ON public.pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Portfolio items policies
CREATE POLICY "Anyone can view published portfolio items" ON public.portfolio_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can view all portfolio items" ON public.portfolio_items
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authors can create portfolio items" ON public.portfolio_items
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own portfolio items" ON public.portfolio_items
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all portfolio items" ON public.portfolio_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Contact messages policies
CREATE POLICY "Anyone can create contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages" ON public.contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact messages" ON public.contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Newsletter subscribers policies
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscribers" ON public.newsletter_subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update subscribers" ON public.newsletter_subscribers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Media files policies
CREATE POLICY "Authenticated users can view media files" ON public.media_files
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload media files" ON public.media_files
  FOR INSERT WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can update their own media files" ON public.media_files
  FOR UPDATE USING (auth.uid() = uploaded_by);

CREATE POLICY "Admins can manage all media files" ON public.media_files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts policies
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can view all blog posts" ON public.blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authors can create blog posts" ON public.blog_posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blog posts" ON public.blog_posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
