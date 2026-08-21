"""Generates public/karlo-dela-rosa-cv.pdf — the static file served by the
CV page's download button. Content here is edited by hand, not read from
src/data/signal.ts, so certifications can appear in the PDF without showing
up on the site.

Requires: pip install reportlab
Run from anywhere: python3 scripts/generate-cv.py
"""

import os

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

INK = HexColor('#16181d')
FOG = HexColor('#5b5f6b')
CARRIER = HexColor('#0e7d6d')
RULE = HexColor('#d7dae0')

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO_ROOT, 'public', 'karlo-dela-rosa-cv.pdf')

doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    leftMargin=1.7 * cm, rightMargin=1.7 * cm,
    topMargin=1.5 * cm, bottomMargin=1.4 * cm,
    title='Karlo Dela Rosa — CV', author='Karlo Dela Rosa',
)

name_style = ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=25, leading=27, textColor=INK)
role_style = ParagraphStyle('role', fontName='Helvetica-Bold', fontSize=13.5, leading=16, textColor=CARRIER, spaceBefore=2)
contact_style = ParagraphStyle('contact', fontName='Helvetica', fontSize=9.7, leading=15, textColor=FOG, alignment=TA_LEFT)

section_style = ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10.5, leading=13, textColor=CARRIER, spaceBefore=0, spaceAfter=7, tracking=1)
summary_style = ParagraphStyle('summary', fontName='Helvetica', fontSize=10, leading=15.5, textColor=INK)

role_line_style = ParagraphStyle('role_line', fontName='Helvetica-Bold', fontSize=10.8, leading=13.5, textColor=INK, spaceAfter=1.5)
period_style = ParagraphStyle('period', fontName='Helvetica', fontSize=8.7, leading=12, textColor=FOG, spaceAfter=2)
note_style = ParagraphStyle('note', fontName='Helvetica', fontSize=9.5, leading=13.8, textColor=INK, spaceBefore=2)
stack_style = ParagraphStyle('stack', fontName='Helvetica-Oblique', fontSize=8.6, leading=12, textColor=FOG, spaceBefore=3, spaceAfter=0)

group_label_style = ParagraphStyle('group_label', fontName='Helvetica-Bold', fontSize=8.8, leading=12, textColor=INK, spaceBefore=0, spaceAfter=1.5)
group_items_style = ParagraphStyle('group_items', fontName='Helvetica', fontSize=9.4, leading=13.5, textColor=FOG, spaceAfter=9)

cert_name_style = ParagraphStyle('cert_name', fontName='Helvetica-Bold', fontSize=9.3, leading=12.5, textColor=INK)
cert_meta_style = ParagraphStyle('cert_meta', fontName='Helvetica', fontSize=8.3, leading=11, textColor=FOG, spaceAfter=10)

story = []

# ---- header ----
story.append(Paragraph('KARLO DELA ROSA', name_style))
story.append(Paragraph('Web Developer', role_style))
story.append(Spacer(1, 5))
story.append(Paragraph(
    'Bulacan, Philippines — Remote &nbsp;|&nbsp; '
    '<link href="mailto:karlordr@gmail.com" color="#5b5f6b">karlordr@gmail.com</link> &nbsp;|&nbsp; '
    '<link href="https://www.linkedin.com/in/karlo-dela-rosa/" color="#5b5f6b">linkedin.com/in/karlo-dela-rosa</link> &nbsp;|&nbsp; '
    '<link href="https://github.com/karlodelarosa" color="#5b5f6b">github.com/karlodelarosa</link>',
    contact_style,
))
story.append(Spacer(1, 11))
story.append(HRFlowable(width='100%', thickness=1, color=RULE, spaceAfter=12))

# ---- summary ----
story.append(Paragraph('SUMMARY', section_style))
story.append(Paragraph(
    'Web developer specializing in composable commerce and CMS platforms, with adaptable expertise across '
    'React/Next.js and Vue/Laravel systems. I actively build real-time software tools (Lyric Lens, Ministry '
    'Lens) for live events, while currently expanding my skill set into creative engineering.',
    summary_style,
))
story.append(Spacer(1, 14))
story.append(HRFlowable(width='100%', thickness=1, color=RULE, spaceAfter=14))

# ---- experience (right col) ----
log = [
    ('Present', 'Senior Web Developer', 'Composable Commerce',
     'Build composable storefronts by wiring React/Next.js frontends to headless commerce backends, '
     'leveraging AI helper tools to rapidly debug and resolve system errors',
     'React · Next.js · JavaScript · E-commerce · CMS'),
    ('2021 — 2023', 'Lead Developer', 'B2B Software',
     'Led a dev team building B2B software. Drove technical planning, established code review standards, '
     'and implemented a CI/CD pipeline that streamlined deployments',
     'Vue · PHP · Laravel · Node.js · CI/CD · Google Cloud · MySQL'),
    ('2020 — 2021', 'Frontend Developer', 'Agency / CMS Solutions',
     'Engineered custom marketing sites and reusable component libraries on HubSpot and WordPress, '
     'accelerating project delivery for multiple agency clients',
     'HubSpot · WordPress · Node.js · JavaScript'),
    ('2018 — 2020', 'Senior Web Developer', 'Real-Time Communications',
     "Built full-stack features for a real-time WebRTC platform and mentored junior developers to level up "
     "the team's Vue and JavaScript standards",
     'WebRTC · JavaScript · Vue'),
    ('2017 — 2018', 'Web Developer', 'ESL Platform',
     'Built and maintained end-to-end features for a high-traffic ESL learning platform using PHP and Laravel',
     'PHP · Laravel · MySQL'),
]

exp_flow = [Paragraph('EXPERIENCE', section_style)]
for period, role, org, note, stack in log:
    exp_flow.append(Paragraph(f'{role} <font color="#0e7d6d">— {org}</font>', role_line_style))
    exp_flow.append(Paragraph(period, period_style))
    exp_flow.append(Paragraph(note, note_style))
    exp_flow.append(Paragraph(stack, stack_style))
    exp_flow.append(Spacer(1, 11))

# ---- skills (left col) ----
skills = [
    ('FRONTEND', 'React, Next.js, Vue, JavaScript'),
    ('BACKEND', 'PHP, Laravel, Node.js, MySQL'),
    ('PLATFORMS', 'Sanity, Contentful, Stripe, Commercetools, Google Cloud, CI/CD'),
    ('PRACTICE', 'Composable Commerce, WebRTC, Creative Engineering'),
    ('3D & MOTION', 'Three.js, WebGL, GSAP, Blender'),
    ('AI & AUTOMATION', 'Claude (Script Automation), Cursor, Copilot, ChatGPT, Gemini'),
]

skills_flow = [Paragraph('SKILLS', section_style)]
for label, items in skills:
    skills_flow.append(Paragraph(label, group_label_style))
    skills_flow.append(Paragraph(items, group_items_style))

# certifications appear only in this PDF, not on the website
certifications = [
    ('Stripe Professional Billing Developer', 'https://stripecertifications.credential.net/a7c941df-f124-4f96-be7f-2784fcfd9f04'),
    ('Stripe Professional Payments Developer', 'https://stripecertifications.credential.net/b882836b-5b6f-4352-863a-99c43488fd58'),
    ('Stripe Associate Developer', 'https://stripecertifications.credential.net/c5171686-ecd1-40f6-bbcb-3a80c2ad6535'),
]

cert_flow = [Spacer(1, 2), Paragraph('CERTIFICATIONS', section_style)]
for cname, curl in certifications:
    cert_flow.append(Paragraph(f'<link href="{curl}" color="#16181d">{cname}</link>', cert_name_style))
    cert_flow.append(Paragraph(f'<link href="{curl}" color="#5b5f6b">Credential →</link>', cert_meta_style))

left_col = skills_flow + cert_flow
right_col = exp_flow

col_table = Table(
    [[left_col, right_col]],
    colWidths=[5.6 * cm, 11.2 * cm],
)
col_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('LEFTPADDING', (0, 0), (0, 0), 0),
    ('RIGHTPADDING', (0, 0), (0, 0), 14),
    ('LEFTPADDING', (1, 0), (1, 0), 14),
    ('RIGHTPADDING', (1, 0), (1, 0), 0),
    ('LINEAFTER', (0, 0), (0, 0), 0.6, RULE),
    ('TOPPADDING', (0, 0), (-1, -1), 0),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
]))

story.append(col_table)

doc.build(story)
print('written', OUT)
