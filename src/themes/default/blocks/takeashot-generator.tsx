'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    Camera,
    UploadCloud,
    X,
    RefreshCw,
    RotateCw,
    Send,
    Download,
    Share2,
    Home,
    CornerUpLeft,
    Star,
    TrendingUp
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

// 模拟范本数据
const MOCK_TEMPLATES = [
    { id: 'd1', name: '你的理想型', category: '梦想同框', image: 'https://placehold.co/400x600/818cf8/ffffff?text=IDEAL_TYPE_PREVIEW', description: '与你心中的那个TA跨次元同框。' },
    { id: 'd2', name: 'TA的位置', category: '梦想同框', image: 'https://placehold.co/400x600/a78bfa/ffffff?text=TA_POSITION_PREVIEW', description: '预留C位，只为与你相遇。' },
    { id: 't1', name: '复古拍立得', category: '情侣专属', image: 'https://placehold.co/400x600/38bdf8/ffffff?text=VINTAGE_PORTRAIT_PREVIEW', description: '高质感复古拍立得风格合影。' },
    { id: 't2', name: '街头潮流', category: '街头潮流', image: 'https://placehold.co/400x600/f97316/ffffff?text=STREET_TREND_PREVIEW', description: '充满活力的街头背景合影。' },
    { id: 't3', name: '海滩浪漫', category: '情侣专属', image: 'https://placehold.co/400x600/fde047/333333?text=BEACH_VACATION_PREVIEW', description: '在夕阳下的海滩浪漫相拥。' },
    { id: 't4', name: '电梯合照', category: '热门推荐', image: 'https://placehold.co/400x600/c026d3/ffffff?text=ESPORTS_COUPLE_PREVIEW', description: '生活化抓拍，营造松弛氛围。' },
    { id: 't5', name: '未来孩子', category: '特殊功能', image: 'https://placehold.co/400x600/06b6d4/ffffff?text=FUTURE_BABY_PREVIEW', description: '预测父母双方特征融合后的未来孩子样貌。' },
    { id: 't6', name: '韩式证件照', category: '热门推荐', image: 'https://placehold.co/400x600/10b981/ffffff?text=KOREAN_ID_PREVIEW', description: '将两张照片人物合成在专业证件照背景。' },
    { id: 'p1', name: '你和你的宠物', category: '人宠合影', image: 'https://placehold.co/400x600/f59e0b/ffffff?text=EXTRA_TEMPLATE_9_PREVIEW', description: '你的位置 | 你的宠物' },
    { id: 'p2', name: '户外散步', category: '人宠合影', image: 'https://placehold.co/400x600/14b8a6/ffffff?text=EXTRA_TEMPLATE_10_PREVIEW', description: '公园阳光下与宠物的幸福时刻' },
    { id: 'p3', name: '温馨日常', category: '人宠合影', image: 'https://placehold.co/400x600/8b5cf6/ffffff?text=EXTRA_TEMPLATE_11_PREVIEW', description: '记录你与毛孩子的温馨瞬间' },
    { id: 't7', name: '滑板公园', category: '街头潮流', image: 'https://placehold.co/400x600/ef4444/ffffff?text=EXTRA_TEMPLATE_12_PREVIEW', description: '酷炫滑板公园背景。' },
];

const TEMPLATE_CATEGORIES = [
    { key: 'all', name: '全部' },
    { key: 'dream_frame', name: '⭐ 梦想同框' },
    { key: 'hot', name: '热门推荐' },
    { key: 'couple', name: '情侣专属' },
    { key: 'pet_companion', name: '🐾 人宠合影' },
    { key: 'street', name: '街头潮流' },
    { key: 'special', name: '特殊功能' },
];

interface Template {
    id: string;
    name: string;
    category: string;
    image: string;
    description: string;
}

interface FileUploaderProps {
    label: string;
    file: File | null;
    onFileChange: (file: File) => void;
    onRemove: () => void;
}

const FileUploader = ({ label, file, onFileChange, onRemove }: FileUploaderProps) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const t = useTranslations('takeashot.common');

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileChange(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileChange(e.target.files[0]);
        }
    };

    const imageUrl = file ? URL.createObjectURL(file) : null;

    return (
        <div className="flex flex-col items-center">
            <label className="text-lg font-semibold mb-2 text-foreground">{label}</label>
            <div
                className={cn(
                    "w-full max-w-sm h-72 border-2 rounded-xl flex flex-col justify-center items-center text-center transition duration-300 p-4 cursor-pointer",
                    isDragOver ? 'border-primary bg-primary/5 border-dashed' : 'border-border border-dashed hover:border-primary/50'
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !file && document.getElementById(`upload-${label}`)?.click()}
            >
                {file ? (
                    <div className="relative w-full h-full">
                        <img src={imageUrl || ''} alt="已上传" className="w-full h-full object-cover rounded-xl" />
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(); }}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-lg hover:bg-destructive/90 transition"
                            title="移除照片"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); document.getElementById(`upload-${label}`)?.click(); }}
                            className="absolute bottom-2 right-2 bg-background text-primary rounded-full p-2 shadow-lg hover:bg-accent transition"
                            title="替换照片"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">点击或拖拽照片至此</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">推荐：人脸清晰、正脸、单人照</p>
                    </>
                )}
            </div>
            <input
                type="file"
                id={`upload-${label}`}
                hidden
                accept="image/*"
                onChange={handleFileInput}
            />
        </div>
    );
};

export function TakeashotGenerator({ featureKey }: { featureKey: string }) {
    const t = useTranslations(`takeashot.${featureKey}`);
    const tc = useTranslations('takeashot.common');

    const searchParams = useSearchParams();

    const defaultCategoryByFeatureKey: Record<string, string> = {
        dream_frame: 'dream_frame',
        ai_couple: 'couple',
        future_baby: 'special',
        pet_companion: 'pet_companion',
    };

    const [step, setStep] = useState('templates'); // templates, upload, result
    const [activeCategory, setActiveCategory] = useState(
        defaultCategoryByFeatureKey[featureKey] || 'all'
    );
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<{ personA: File | null; personB: File | null }>({ personA: null, personB: null });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const category = searchParams.get('category');
        const nextCategory =
            category || defaultCategoryByFeatureKey[featureKey] || 'all';

        setStep('templates');
        setActiveCategory(nextCategory);

        // Scroll to Step 1 and ensure category tabs are visible
        requestAnimationFrame(() => {
            const stepEl = document.getElementById('step-1');
            if (stepEl) {
                stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            const tab = document.querySelector<HTMLButtonElement>(
                `[data-category="${nextCategory}"]`
            );
            if (tab) {
                tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureKey, searchParams]);

    const filteredTemplates = useMemo(() => {
        if (activeCategory === 'all') {
            return MOCK_TEMPLATES;
        }
        const categoryMap: Record<string, string[]> = {
            'dream_frame': ['d1', 'd2'],
            'hot': ['t4', 't6'],
            'couple': ['t1', 't3'],
            'pet_companion': ['p1', 'p2', 'p3'],
            'street': ['t2', 't7'],
            'special': ['t5'],
        };
        const templateIds = categoryMap[activeCategory] || [];
        return MOCK_TEMPLATES.filter(t => templateIds.includes(t.id));
    }, [activeCategory]);

    const handleSelectTemplate = (template: Template) => {
        setSelectedTemplate(template);
        setStep('upload');
    };

    const handleFileChange = useCallback((person: 'personA' | 'personB', file: File) => {
        setError(null);
        if (file.size > 5 * 1024 * 1024) {
            setError(tc('upload_error_size'));
            return;
        }
        setUploadedFiles(prev => ({ ...prev, [person]: file }));
    }, [tc]);

    const handleRemoveFile = useCallback((person: 'personA' | 'personB') => {
        setUploadedFiles(prev => ({ ...prev, [person]: null }));
    }, []);

    const handleGenerate = async () => {
        if (!uploadedFiles.personA || !uploadedFiles.personB || isGenerating) return;
        setIsGenerating(true);
        setError(null);
        try {
            // In a real app, you would upload files to storage first and get URLs
            // For this demo, we'll pass mock URLs or just the templateId
            const response = await fetch('/api/takeashot/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    templateId: selectedTemplate?.id,
                    personAUrl: 'mock_url_a',
                    personBUrl: 'mock_url_b',
                }),
            });

            const result = await response.json();

            if (result.code !== 0) {
                throw new Error(result.message || tc('upload_error_gen'));
            }

            setGeneratedImage(result.data.resultUrl);
            setStep('result');
        } catch (err: any) {
            setError(err.message || tc('upload_error_gen'));
        } finally {
            setIsGenerating(false);
        }
    };

    if (step === 'templates') {
        return (
            <div id="step-1" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="mb-6 flex items-center justify-start">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                    >
                        <Home className="h-4 w-4" />
                        {tc('back_to_home')}
                    </Link>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t('step1')}</h2>
                <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {TEMPLATE_CATEGORIES.map(category => (
                        <button
                            key={category.key}
                            onClick={() => setActiveCategory(category.key)}
                            data-category={category.key}
                            className={cn(
                                "px-6 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-all duration-200",
                                activeCategory === category.key
                                    ? 'bg-foreground text-background shadow-lg transform scale-105'
                                    : 'bg-card text-muted-foreground hover:bg-accent border border-border'
                            )}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredTemplates.map(template => (
                        <div
                            key={template.id}
                            className="bg-card rounded-[2rem] overflow-hidden shadow-sm border border-border cursor-pointer group hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                            onClick={() => handleSelectTemplate(template)}
                        >
                            <div className="relative overflow-hidden aspect-[3/4] w-full">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white text-xl font-bold mb-1 drop-shadow-md">{template.name}</h3>
                                    <p className="text-white/80 text-sm line-clamp-1">{template.description}</p>
                                </div>
                                {template.category.includes('热门') && (
                                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-red-500 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-1" /> 热门
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isGenerating) {
        const loadingMessages = tc.raw('loading_messages');
        const currentMessageIndex = Math.floor(Date.now() / 1500) % loadingMessages.length;
        return (
            <div className="py-24 flex flex-col items-center justify-center text-center">
                <RotateCw className="w-16 h-16 text-primary animate-spin mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">{tc('generating')}</h2>
                <p className="text-lg text-muted-foreground mb-8">{loadingMessages[currentMessageIndex]}</p>
                <div className="w-64 h-2 bg-muted rounded-full mx-auto">
                    <div className="h-full bg-primary rounded-full animate-pulse w-3/4"></div>
                </div>
            </div>
        );
    }

    if (step === 'upload' && selectedTemplate) {
        return (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <button onClick={() => setStep('templates')} className="flex items-center text-primary hover:underline mb-8 font-medium transition">
                    <CornerUpLeft className="w-5 h-5 mr-2" />
                    {tc('back_to_templates')}
                </button>
                <h2 className="text-3xl font-bold text-foreground mb-10 text-center">{t('step2')}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-card p-6 rounded-2xl shadow-xl border border-border">
                        <h3 className="text-2xl font-bold text-foreground mb-4">范本预览: {selectedTemplate.name}</h3>
                        <img
                            src={selectedTemplate.image}
                            alt={selectedTemplate.name}
                            className="w-full h-auto rounded-xl shadow-lg border-4 border-primary/20"
                        />
                    </div>
                    <div className="flex flex-col space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FileUploader
                                label={t('upload_label_a')}
                                file={uploadedFiles.personA}
                                onFileChange={(file) => handleFileChange('personA', file)}
                                onRemove={() => handleRemoveFile('personA')}
                            />
                            <FileUploader
                                label={t('upload_label_b')}
                                file={uploadedFiles.personB}
                                onFileChange={(file) => handleFileChange('personB', file)}
                                onRemove={() => handleRemoveFile('personB')}
                            />
                        </div>
                        <div className="bg-card p-6 rounded-2xl shadow-md border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center">
                                <Send className="w-5 h-5 mr-2 text-primary" />
                                最佳上传指引
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span>{t('guide_a')}</li>
                                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span>{t('guide_b')}</li>
                                <li className="flex items-start"><span className="text-destructive font-bold mr-2">✗</span>{t('guide_avoid')}</li>
                                <li className="flex items-start"><span className="text-primary font-bold mr-2">i</span>{tc('upload_tip')}</li>
                            </ul>
                        </div>
                        {error && <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-xl text-sm">{error}</div>}
                        <Button
                            onClick={handleGenerate}
                            disabled={!uploadedFiles.personA || !uploadedFiles.personB || isGenerating}
                            className="w-full py-6 text-xl font-bold rounded-full"
                        >
                            {tc('generate')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'result' && generatedImage) {
        return (
            <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">{tc('success')}</h2>
                <p className="text-xl text-muted-foreground mb-10">范本: {selectedTemplate?.name}</p>
                <div className="bg-card p-6 rounded-2xl shadow-2xl border-4 border-green-300 inline-block mb-10">
                    <img src={generatedImage} alt="AI 生成结果" className="max-h-[70vh] w-auto rounded-xl shadow-lg" />
                </div>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button className="px-8 py-6 text-lg font-bold rounded-full shadow-xl">
                        <Download className="w-5 h-5 mr-2" /> {tc('download')}
                    </Button>
                    <Button variant="outline" className="px-8 py-6 text-lg font-bold rounded-full shadow-md">
                        <Share2 className="w-5 h-5 mr-2" /> {tc('share')}
                    </Button>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <button onClick={() => setStep('templates')} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition">
                        <RotateCw className="w-4 h-4 mr-1" /> {tc('retry')}
                    </button>
                    <button onClick={() => window.location.href = '/'} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition">
                        <Home className="w-4 h-4 mr-1" /> {tc('back_to_home')}
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
