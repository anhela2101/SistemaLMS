do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'courses'
      and policyname = 'Authenticated users can read published courses'
  ) then
    create policy "Authenticated users can read published courses"
    on public.courses
    for select
    using (status = 'published');
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'course_modules'
      and policyname = 'Authenticated users can read active modules of published courses'
  ) then
    create policy "Authenticated users can read active modules of published courses"
    on public.course_modules
    for select
    using (
      is_active = true
      and exists (
        select 1
        from public.courses
        where courses.id = course_modules.course_id
          and courses.status = 'published'
      )
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'lessons'
      and policyname = 'Authenticated users can read active lessons of published courses'
  ) then
    create policy "Authenticated users can read active lessons of published courses"
    on public.lessons
    for select
    using (
      is_active = true
      and exists (
        select 1
        from public.courses
        where courses.id = lessons.course_id
          and courses.status = 'published'
      )
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'course_enrollments'
      and policyname = 'Users can read own enrollments'
  ) then
    create policy "Users can read own enrollments"
    on public.course_enrollments
    for select
    using ((select auth.uid()) = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'payments'
      and policyname = 'Users can read own payments'
  ) then
    create policy "Users can read own payments"
    on public.payments
    for select
    using ((select auth.uid()) = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'certificates'
      and policyname = 'Users can read own certificates'
  ) then
    create policy "Users can read own certificates"
    on public.certificates
    for select
    using ((select auth.uid()) = user_id);
  end if;
end;
$$;
