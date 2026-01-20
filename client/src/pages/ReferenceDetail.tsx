import { useParams, useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ExternalLink, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Streamdown } from "streamdown";

/**
 * Página de detalhes da análise de referência
 * Exibe análise completa com seções estruturadas e embed de vídeo
 */
export default function ReferenceDetail() {
  const params = useParams();
  const [, navigate] = useLocation();
  
  const projectId = parseInt(params.id || "0");
  const referenceId = parseInt(params.refId || "0");

  // Buscar dados da referência
  const { data: reference, isLoading, error } = trpc.references.getById.useQuery({
    id: referenceId,
  });

  // Extrair videoId do YouTube para embed
  const getYouTubeVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      
      // YouTube normal: youtube.com/watch?v=VIDEO_ID
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      }
      
      // YouTube Shorts: youtube.com/shorts/VIDEO_ID
      if (urlObj.pathname.includes('/shorts/')) {
        return urlObj.pathname.split('/shorts/')[1]?.split('?')[0];
      }
      
      // youtu.be/VIDEO_ID
      if (urlObj.hostname === 'youtu.be') {
        return urlObj.pathname.substring(1);
      }
      
      return null;
    } catch {
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando análise...</p>
        </div>
      </div>
    );
  }

  if (error || !reference) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive mb-4">Erro ao carregar análise</p>
            <Button onClick={() => navigate(`/project/${projectId}/references`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Referências
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(reference.videoUrl);

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${projectId}/references`)}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">Análise de Referência</h1>
          {reference.creatorName && (
            <p className="text-muted-foreground mt-1">
              {reference.creatorName}
              {reference.niche && ` • ${reference.niche}`}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href={reference.videoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Abrir Vídeo
            </a>
          </Button>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Gerar Roteiro
          </Button>
        </div>
      </div>

      {/* Video Embed */}
      {videoId && (
        <Card>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Análise Completa */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Análise Completa
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <Streamdown>{reference.analysis}</Streamdown>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Data de Análise</span>
            <span>{new Date(reference.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
          {reference.niche && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nicho</span>
              <Badge variant="secondary">{reference.niche}</Badge>
            </div>
          )}
          {reference.creatorName && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Criador</span>
              <span>{reference.creatorName}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
