interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  return <div className="h-full">{children}</div>;
};

export default WorkspaceIdLayout;
