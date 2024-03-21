interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({
  children,
  ...restProps
}: ThemeProviderProps): JSX.Element => {
  return <div className="app_container">{children}</div>;
};
